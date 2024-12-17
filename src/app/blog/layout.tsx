import { ReactNode } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getParentMetadata } from "@/lib/utils";

export async function generateMetadata(
  params: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const prevMetadata = await getParentMetadata(parent);
  const title = "Blog - Özgür ÖZALP";
  const description = "Personal blog of Özgür ÖZALP";

  return {
    title,
    description,
    openGraph: {
      ...(prevMetadata?.openGraph ?? {}),
      title,
    },
    twitter: {
      ...(prevMetadata?.twitter ?? {}),
      title,
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
