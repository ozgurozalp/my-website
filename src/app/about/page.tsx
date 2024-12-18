import { Metadata, ResolvingMetadata } from "next";
import { getParentMetadata } from "@/lib/utils";

export async function generateMetadata(
  params: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const prevMetadata = await getParentMetadata(parent);
  const title = "Who is Ozgur Ozalp?";
  const description =
    "Hello, I’m Ozgur Ozalp! I’m a software developer based in Istanbul, specializing in frontend and fullstack development. I’m proficient in React, Next.js, TypeScript, JavaScript, Tailwind CSS, and Shadcn...";

  return {
    ...prevMetadata,
    title,
    description,
    openGraph: {
      ...(prevMetadata?.openGraph ?? {}),
      title,
      description,
    },
    twitter: {
      ...(prevMetadata?.twitter ?? {}),
      title,
      description,
    },
  };
}

export default function Page() {
  return (
    <article>
      <div className="flex flex-col">
        <div className="container">
          <div className="flex flex-col gap-4 pt-4">
            <h1 className="blog-card-title max-w-2xl">About Me</h1>
          </div>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-52 h-[calc(100%-13rem)] w-full border-t border-gray-200 bg-background" />
          <div className="w-full container grid grid-cols-3 gap-5 pt-4 md:pt-10 lg:gap-10">
            <div className="relative col-span-3 flex flex-col bg-white sm:rounded-t-xl sm:border !border-b-0 sm:border-gray-200 md:col-span-2">
              <img
                className="aspect-video rounded-t-xl object-contain"
                width={1920}
                height={1080}
                src="/ozgurozalp.png"
                alt="Ozgur Ozalp"
              />
              <div className="prose p-4 sm:p-10 max-w-full prose-gray transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold">
                <p>Hi, </p>
                <p>
                  I’m <strong>Ozgur Ozalp</strong>! I’m a software developer
                  based in Istanbul, specializing in frontend and fullstack
                  development. I work with modern technologies such as React,
                  Next.js, TypeScript, JavaScript, Tailwind CSS, Shadcn, and
                  many more.
                </p>
                <p>
                  My passion for technology extends beyond coding; I also enjoy
                  working with advanced tools like RabbitMQ and Kafka.
                  Contributing to open-source projects and sharing my ideas are
                  activities I deeply enjoy.
                </p>
                <p>
                  I love creating innovative projects in diverse areas like web
                  games, Chrome extensions, and customizable user interfaces.
                  For instance, I developed{" "}
                  <a href="http://rock.paperscissors.online/">
                    rock.paperscissors.online
                  </a>
                  , a fun web game, and a Chrome extension named{" "}
                  <a target="_blank" href="https://unfolks.com/">
                    Unfolks
                  </a>{" "}
                  that helps you find people who don’t follow you back on
                  Instagram.
                </p>
                <p>
                  Outside of work, I believe in leading a fulfilling and
                  balanced life. I spend quality time with my girlfriend Zeynep,
                  engaging in creative discussions and enjoying the little joys
                  of life. I’m based in Istanbul and prefer working remotely
                  while striving to push the boundaries of technology.
                </p>
                <p>
                  If you’d like to learn more about my projects or collaborate
                  with me, feel free to reach out!
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:mail@ozgurozalp.com">mail@ozgurozalp.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
