"use client";
import { links } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-[--body-height] items-center gap-8 justify-center px-4 sm:px-8 overflow-hidden">
      <div className="w-full sm:w-[360px] flex flex-col gap-8 justify-center">
        <div className="bg-border rounded-full p-[3px] w-fit shadow shadow-border">
          <img
            className="rounded-full border-[3px] border-white aspect-square object-cover"
            width={150}
            height={150}
            src="/ozgurozalp.png"
            alt="Özgür ÖZALP"
            draggable={false}
          />
        </div>
        <div className="text-border text-3xl md:text-3xl font-semibold">
          <div>
            <span>Hello, I&apos;m</span>{" "}
            <h1 className="px-1 py-2 text-2xl md:text-3xl inline-block bg-border">
              <strong className="text-white pacifico-regular">
                Özgür ÖZALP.
              </strong>
            </h1>
          </div>
          <div className="text-balance">
            A Full Stack Developer based in Istanbul, TR.
          </div>
        </div>
        <div className="flex justify-between flex-wrap items-center gap-[5px]">
          {links.map((link) => (
            <TooltipProvider key={link.url}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    className={cn(
                      "self-start",
                      buttonVariants({
                        variant: "outline",
                        size: "icon-lg",
                      }),
                      "rounded-full p-0 aspect-square border-2 border-border shrink-0",
                    )}
                    target={
                      link.url.startsWith("http") || link?.target === "_blank"
                        ? "_blank"
                        : "_self"
                    }
                    href={link.url}
                  >
                    <link.icon className="size-6" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
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
