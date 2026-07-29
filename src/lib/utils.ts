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
  // structuredClone throws DataCloneError since Next 15.2.8: the resolved
  // metadata contains non-cloneable objects (e.g. metadataBase as URL), which
  // breaks prerendering of every page using this helper. Shallow-copy the
  // nested objects we actually mutate instead of deep-cloning everything.
  const resolved = await parent;
  const metadata = {
    ...resolved,
    ...(resolved.title ? { title: { ...resolved.title } } : {}),
    ...(resolved.twitter ? { twitter: { ...resolved.twitter } } : {}),
    ...(resolved.openGraph ? { openGraph: { ...resolved.openGraph } } : {}),
  };
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
