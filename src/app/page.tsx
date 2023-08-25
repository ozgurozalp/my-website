import { links } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <section className="home-page">
      <div className="w-full sm:w-[390px] flex flex-col gap-8 justify-center">
        <Image
          className="rounded-full aspect-square border-[5px] border-gray"
          width={150}
          height={150}
          quality={100}
          src="/ozgurozalp.png"
          alt="Özgür ÖZALP"
          draggable={false}
        />
        <h1>
          Hello, I&apos;m{" "}
          <strong className="p-1 inline-block bg-black text-white">
            Özgür ÖZALP.
          </strong>
          <br />A Full Stack Developer based in Istanbul, TR.
        </h1>
        <div className="flex flex-col gap-[5px]">
          {links.map((link) => (
            <a
              key={link.url}
              className="self-start"
              target="_blank"
              href={link.url}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
