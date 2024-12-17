import { Category } from "@/lib/constants";
import BlogList from "@/components/shared/BlogList";
import { getCategories } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { capitalize, getParentMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const prevMetadata = await getParentMetadata(parent);
  const category = (await params).slug;

  const title = `Blog category - ${capitalize(category)}`;

  return {
    title,
    description: prevMetadata.description,
    category: prevMetadata.category,
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

export default async function Page({ params }: Props) {
  return (
    <div className="container grid space-y-10 py-4 min-h-[--body-height]">
      <BlogList category={(await params).slug as Category} />
    </div>
  );
}
