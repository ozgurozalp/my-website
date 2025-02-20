export function GET() {
  const html = `
<style>
body {
  margin: 0;
  padding: 0;
  height: 100dvh;
}

#container {
  position: fixed;
  inset: 0;
}

canvas {
    height: 100dvh !important;
    width: 100dvw !important;
}
</style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js"></script>
  <title>
  Eylül'e Özel
</title>
<script id="vertexShader" type="x-shader/x-vertex">
    void main() {
        gl_Position = vec4( position, 1.0 );
    }
</script>
<script id="fragmentShader" type="x-shader/x-fragment">
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
  
    const int octaves = 2;
    const float seed = 43758.5453123;
    const float seed2 = 73156.8473192;
    // Epsilon value
    const float eps = 0.005;
  
    const vec3 ambientLight = 0.99 * vec3(1.0, 1.0, 1.0);
    const vec3 light1Pos = vec3(10., 5.0, -25.0);
    const vec3 light1Intensity = vec3(0.35);
    const vec3 light2Pos = vec3(-20., -25.0, 85.0);
    const vec3 light2Intensity = vec3(0.2);
  
    // movement variables
    vec3 movement = vec3(.0);

    // Gloable variables for the raymarching algorithm.
    const int maxIterations = 256;
    const int maxIterationsShad = 16;
    const float stepScale = .7;
    const float stopThreshold = 0.001;
  
  
  mat4 rotationMatrix(vec3 axis, float angle)
  {
      axis = normalize(axis);
      float s = sin(angle);
      float c = cos(angle);
      float oc = 1.0 - c;

      return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                  0.0,                                0.0,                                0.0,                                1.0);
  }
  
  
  float length2( vec2 p )
  {
    return sqrt( p.x*p.x + p.y*p.y );
  }

  float length6( vec2 p )
  {
    p = p*p*p; p = p*p;
    return pow( p.x + p.y, 1.0/6.0 );
  }

  float length8( vec2 p )
  {
    p = p*p; p = p*p; p = p*p;
    return pow( p.x + p.y, 1.0/8.0 );
  }
  
  // Distance function primitives
  // Reference: http://iquilezles.org/www/articles/distfunctions/distfunctions.htm
  float sdBox( vec3 p, vec3 b )
  {
    vec3 d = abs(p) - b;
    return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
  }
  float udBox( vec3 p, vec3 b )
  {
    return length(max(abs(p)-b,0.0));
  }
  float udRoundBox( vec3 p, vec3 b, float r )
  {
    return length(max(abs(p)-b,0.0))-r;
  }
  float sdSphere( vec3 p, float s )
  {
    return length(p)-s;
  }
  float sdCylinder( vec3 p, vec3 c )
  {
    return length(p.xz-c.xy)-c.z;
  }
  float sdCappedCylinder( vec3 p, vec2 h )
  {
    vec2 d = abs(vec2(length(p.xz),p.y)) - h;
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
  }
  float sdTorus82( vec3 p, vec2 t )
  {
    vec2 q = vec2(length2(p.xz)-t.x,p.y);
    return length8(q)-t.y;
  }
  float sdPlane( vec3 p)
  {
    return p.y;
  }
  
  // smooth min
  // reference: http://iquilezles.org/www/articles/smin/smin.htm
  float smin(float a, float b, float k) {
      float res = exp(-k*a) + exp(-k*b);
      return -log(res)/k;
  }
  
  vec3 random3( vec3 p ) {
      return fract(sin(vec3(dot(p,vec3(127.1,311.7,319.8)),dot(p,vec3(269.5,183.3, 415.2)),dot(p,vec3(362.9,201.5,134.7))))*43758.5453);
  }
  vec2 random2( vec2 p ) {
      return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
  }
  
  // The world!
  float world_sdf(in vec3 p) {
    float world = 10.;
    
    vec3 grid = floor(p);
    vec2 rand = random2(grid.xy);
    // if(mod(grid.x + grid.y, 2.) == 0.) {
    //   return 1.;
    // }
    p.z += u_time * rand.x;
    
    float time = u_time + 20.*random2(floor(p.xz)).x;
    
    p = mod(p, 1.0) - .5;
    
    p.y = p.y - abs(p.x) * (2. - abs(p.x))  / 3.;
    
    world = sdSphere(p, .3 + -abs(sin(time + cos(time))) * .1);
    // world = smin(world, world, 1.5);
    
    return world;
  }
  
  // Fuck yeah, normals!
  vec3 calculate_normal(in vec3 p)
  {
    const vec3 small_step = vec3(0.0001, 0.0, 0.0);
    
    float gradient_x = world_sdf(vec3(p.x + eps, p.y, p.z)) - world_sdf(vec3(p.x - eps, p.y, p.z));
    float gradient_y = world_sdf(vec3(p.x, p.y + eps, p.z)) - world_sdf(vec3(p.x, p.y - eps, p.z));
    float gradient_z = world_sdf(vec3(p.x, p.y, p.z  + eps)) - world_sdf(vec3(p.x, p.y, p.z - eps));
    
    vec3 normal = vec3(gradient_x, gradient_y, gradient_z);

    return normalize(normal);
  }

  // Raymarching.
  float rayMarching( vec3 origin, vec3 dir, float start, float end, inout float field ) {
    
    float sceneDist = 1e4;
    float rayDepth = start;
    for ( int i = 0; i < maxIterations; i++ ) {
      sceneDist = world_sdf( origin + dir * rayDepth ); // Distance from the point along the ray to the nearest surface point in the scene.

      if (( sceneDist < stopThreshold ) || (rayDepth >= end)) {        
        break;
      }
      // We haven't hit anything, so increase the depth by a scaled factor of the minimum scene distance.
      rayDepth += sceneDist * stepScale;
    }
  
    if ( sceneDist >= stopThreshold ) rayDepth = end;
    else rayDepth += sceneDist;
      
    // We've used up our maximum iterations. Return the maximum distance.
    return rayDepth;
  }
  

  // Shadows
  // Reference at: http://www.iquilezles.org/www/articles/rmshadows/rmshadows.htm
  float softShadow(vec3 ro, vec3 lightPos, float start, float k){
    
      vec3 rd = lightPos - ro;
      float end = length(rd);

      float shade = 1.0;

      float dist = start;
      float stepDist = start;

      for (int i=0; i<maxIterationsShad; i++){
          float h = world_sdf(ro + rd*dist);
          shade = min(shade, k*h/dist);
          
          dist += min(h, stepDist*2.); // The best of both worlds... I think. 
          
          if (h<0.001 || dist > end) break; 
      }

      return min(max(shade, 0.) + 0.3, 1.0); 
  }

  // Based on original by IQ - optimized to remove a divide
  float calculateAO(vec3 p, vec3 n)
  {
     const float AO_SAMPLES = 5.0;
     float r = 0.0;
     float w = 1.0;
     for (float i=1.0; i<=AO_SAMPLES; i++)
     {
        float d0 = i * 0.15; // 1.0/AO_SAMPLES
        r += w * (d0 - world_sdf(p + n * d0));
        w *= 0.5;
     }
     return 1.0-clamp(r,0.0,1.0);
  }
  
  /**
   * Lighting
   * This stuff is way way better than the model I was using.
   * Courtesy Shane Warne
   * Reference: http://raymarching.com/
   * -------------------------------------
   * */
  
  // Lighting.
  vec3 lighting( vec3 sp, vec3 camPos, int reflectionPass, float dist, float field, vec3 rd) {
    
    // Start with black.
    vec3 sceneColor = vec3(0.0);

    vec3 grid = floor(sp);
    vec2 rand = random2(grid.xy);
    vec3 voxPos = mod((sp + vec3(0., 0., u_time * rand.x)) * 0.25, 1.0);
    vec3 objColor = vec3(1.0, .5, .5);
    objColor.y *= voxPos.z*0.8;
    objColor.z *= voxPos.x*0.8;

    // Obtain the surface normal at the scene position "sp."
    vec3 surfNormal = calculate_normal(sp);

    // Lighting.

    // lp - Light position. Keeping it in the vacinity of the camera, but away from the objects in the scene.
    vec3 lp = vec3(0., 0.0, -1.0) + movement;
    // ld - Light direction.
    vec3 ld = lp-sp;
    // lcolor - Light color.
    vec3 lcolor = vec3(1.,0.97,0.92) * .8;
    
     // Light falloff (attenuation).
    float len = length( ld ); // Distance from the light to the surface point.
    ld /= len; // Normalizing the light-to-surface, aka light-direction, vector.
    // float lightAtten = min( 1.0 / ( 0.15*len*len ), 1.0 ); // Removed light attenuation for this because I want the fade to white
    
    float sceneLen = length(camPos - sp); // Distance of the camera to the surface point
    float sceneAtten = min( 1.0 / ( 0.015*sceneLen*sceneLen ), 1.0 ); // Keeps things between 0 and 1.   

    // Obtain the reflected vector at the scene position "sp."
    vec3 ref = reflect(-ld, surfNormal);
    
    float ao = 1.0; // Ambient occlusion.
    // ao = calculateAO(sp, surfNormal); // Ambient occlusion.

    float ambient = .5; //The object's ambient property.
    float specularPower = 200.; // The power of the specularity. Higher numbers can give the object a harder, shinier look.
    float diffuse = max( 0.0, dot(surfNormal, ld) ); //The object's diffuse value.
    float specular = max( 0.0, dot( ref, normalize(camPos-sp)) ); //The object's specular value.
    specular = pow(specular, specularPower); // Ramping up the specular value to the specular power for a bit of shininess.
    \t
    // Bringing all the lighting components togethr to color the screen pixel.
    sceneColor += (objColor*(diffuse*0.8+ambient)+specular*0.5)*lcolor*1.3;
    sceneColor = mix(sceneColor, vec3(1.), 1.-sceneAtten*sceneAtten); // fog
    
    // float shadow = softShadow(sp, lp, .1, 1.);
    // sceneColor *= shadow + .8;
    
    return sceneColor;

  }

    void main() {
      
      // Setting up our screen coordinates.
      vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0); //
      vec2 uv = (2.0*gl_FragCoord.xy/u_resolution.xy - 1.0)*aspect;
      
      // This just gives us a touch of fisheye
      // uv *= 1. + dot(uv, uv) * 0.4;
      
      // movement
      movement = vec3(u_time / 5., 0., u_time / 1.);
      movement = vec3(0., 0., u_time / 6.);
      movement.x = cos(u_time / 8.) * 4.;
      movement.y = sin(u_time / 8.) * 4.;
      
      // The sin in here is to make it look like a walk.
      vec3 lookAt = vec3(-0., 0.2, 1.);  // This is the point you look towards, or at, if you prefer.
      vec3 camera_position = vec3(clamp(0.5 - u_mouse.x / u_resolution.x, -.5, .5), 0.15 + u_mouse.y / u_resolution.y - .5, -1.0); // This is the point you look from, or camera you look at the scene through. Whichever way you wish to look at it.
      
      lookAt += movement;
      // lookAt.z += sin(u_time / 10.) * .5;
      // lookAt.x += cos(u_time / 10.) * .5;
      camera_position += movement;
      
      vec3 forward = normalize(lookAt-camera_position); // Forward vector.
      vec3 right = normalize(vec3(forward.z, 0., -forward.x )); // Right vector... or is it left? Either way, so long as the correct-facing up-vector is produced.
      vec3 up = normalize(cross(forward,right)); // Cross product the two vectors above to get the up vector.

      // FOV - Field of view.
      float FOV = 0.4;

      // ro - Ray origin.
      vec3 ro = camera_position; 
      // rd - Ray direction.
      vec3 rd = normalize(forward + FOV*uv.x*right + FOV*uv.y*up);
      
      // Ray marching.
      const float clipNear = 0.0;
      const float clipFar = 16.0;
      float field = 0.;
      float dist = rayMarching(ro, rd, clipNear, clipFar, field );
      if ( dist >= clipFar ) {
        gl_FragColor = vec4(vec3(1.), 1.0);
        return;
      }

      // sp - Surface position. If we've made it this far, we've hit something.
      vec3 sp = ro + rd*dist;

      // Light the pixel that corresponds to the surface position. The last entry indicates that it's not a reflection pass
      // which we're not up to yet.
      vec3 sceneColor = lighting( sp, camera_position, 0, dist, field, rd);

      // Clamping the lit pixel, then put it on the screen.
      gl_FragColor = vec4(clamp(sceneColor, 0.0, 1.0), 1.0);


    }
</script>


<div id="container"></div>

<script>
useScreenPixelRatio = false;

/*
Most of the stuff in here is just bootstrapping. Essentially it's just
setting ThreeJS up so that it renders a flat surface upon which to draw 
the shader. The only thing to see here really is the uniforms sent to 
the shader. Apart from that all of the magic happens in the HTML view
under the fragment shader.
*/

let container;
let camera, scene, renderer;
let uniforms;

function init() {
  container = document.getElementById( 'container' );

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) }
  };

  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  if(!useScreenPixelRatio) {
  renderer.setPixelRatio( 1 );
  }

  container.appendChild( renderer.domElement );

  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );

  document.onmousemove = function(e){
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
  }
}

function onWindowResize( event ) {
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  if(w > 1600) w = 1600;
  if(h > 800) h = 800
  
  renderer.setSize( w, h );
  uniforms.u_resolution.value.x = w;
  uniforms.u_resolution.value.y = h;
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  uniforms.u_time.value += 0.04;
  renderer.render( scene, camera );
}



init();
animate();
</script>
  `;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
