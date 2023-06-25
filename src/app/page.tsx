import HomeCard from "@/components/shared/HomeCard";
import Image from "next/image";

export default function Home() {
  return (
    <HomeCard>
      <Image
        className="rounded-full aspect-square border-[5px] border-gray"
        width={150}
        height={150}
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
        <a href="https://twitter.com/ozqurozalp">Twitter</a>
        <a href="https://instagram.com/ozqurozalp">Instagram</a>
        <a href="https://github.com/ozgurozalp">GitHub</a>
        <a href="https://www.linkedin.com/in/ozgurozalp">LinkedIn</a>
        <a href="mailto:mail@ozgurozalp.com">Get in touch</a>
      </div>
    </HomeCard>
  );
}
