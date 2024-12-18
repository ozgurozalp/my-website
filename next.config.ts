import createMDXPlugin from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const oldBLogs = [
  "/node-js-express-uygulamasi-nasil-dockerize-edilir",
  "/kubernetes-nedir-ve-neden-kullanilir",
  "/windows-bilgisayarda-php-calistirma",
  "/guzzle-http-nasil-kullanilir",
  "/deno-js-nedir",
  "/react-nedir",
  "/wordpress-nedir-nasil-kurulur",
  "/php-nedir-ne-amacla-kullanilir",
  "/vuejs-nedir-neden-kullanmaliyiz",
];

const withMDX = createMDXPlugin({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["renoun"],
  async redirects() {
    return [
      {
        source: "/kategori/:slug",
        destination: "/blog/category/:slug",
        permanent: true,
      },
      ...oldBLogs.map((oldBlog) => ({
        source: oldBlog,
        destination: "/blog" + oldBlog,
        permanent: true,
      })),
    ];
  },
});
