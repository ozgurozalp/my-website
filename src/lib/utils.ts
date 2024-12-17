import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata, ResolvingMetadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getParentMetadata(parent: ResolvingMetadata) {
  const metadata = structuredClone(await parent);
  if (metadata.twitter?.title?.absolute) {
    // @ts-ignore
    metadata.twitter.title = metadata.twitter.title.absolute;
  }

  if (metadata.openGraph?.title?.absolute) {
    // @ts-ignore
    metadata.openGraph.title = metadata.openGraph.title.absolute;
  }

  if (metadata.title?.absolute) {
    // @ts-ignore
    metadata.title = metadata.title.absolute;
  }

  return metadata as Metadata;
}
