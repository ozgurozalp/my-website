"use client";
import { links } from "@/constants";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
        <div className="flex justify-between gap-[5px]">
          {links.map((link) => (
            <TooltipProvider key={link.url}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    className={cn(
                      "self-start",
                      buttonVariants({
                        variant: "outline",
                        size: "icon",
                      }),
                      "rounded-full"
                    )}
                    target="_blank"
                    href={link.url}
                  >
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">{link.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  );
}
