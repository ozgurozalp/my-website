import { CATEGORIES, Category } from "@/lib/constants";
import BlogList from "@/components/shared/BlogList";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export default async function Page({ params }: Props) {
  return (
    <div className="container grid space-y-10 py-4 min-h-[--body-height]">
      <BlogList category={params.slug as Category} />
    </div>
  );
}
