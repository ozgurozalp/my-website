import { Category } from "@/lib/constants";
import BlogList from "@/components/shared/BlogList";
import { getCategories } from "@/actions";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category }));
}

export default async function Page({ params }: Props) {
  return (
    <div className="container grid space-y-10 py-4 min-h-[--body-height]">
      <BlogList category={(await params).slug as Category} />
    </div>
  );
}
