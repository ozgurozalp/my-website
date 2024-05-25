import { notFound } from "next/navigation";
import { allBlogs } from "../../../../content";
import { dateFormat } from "@/lib/utils";
import { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allBlogs.paths().map((pathname) => ({ slug: pathname }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await allBlogs.get(params.slug);

  if (!doc) {
    return {};
  }

  const { frontMatter } = doc;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    authors: {
      url: frontMatter.author.url,
      name: frontMatter.author.name,
    },
    category: frontMatter.categories.join(", "),
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      images: frontMatter.coverImage,
    },
    twitter: {
      title: frontMatter.title,
      description: frontMatter.description,
      images: frontMatter.coverImage,
    },
  };
}

export default async function Page({ params }: Props) {
  const doc = await allBlogs.get(params.slug);

  if (!doc) {
    return notFound();
  }

  const { Content, frontMatter } = doc;

  const Document = Content as JSX.ElementType;

  return (
    <article>
      <div className="flex flex-col">
        <div className="container">
          <div className="flex flex-col gap-4 pt-4">
            <h1 className="blog-card-title max-w-2xl">{frontMatter.title}</h1>
            <time
              dateTime={frontMatter.createdAt.toString()}
              className="blog-card-date"
            >
              {dateFormat(frontMatter.createdAt)}
            </time>
            <p className="max-w-full sm:max-w-lg lg:max-w-xl xl:max-w-3xl blog-card-description text-[#374151]">
              {frontMatter.description}
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-52 h-[calc(100%-13rem)] w-full border-t border-gray-200 bg-background" />
          <div className="w-full container grid grid-cols-3 gap-5 pt-4 md:pt-10 lg:gap-10">
            <div className="relative col-span-3 flex flex-col bg-white sm:rounded-t-xl sm:border !border-b-0 sm:border-gray-200 md:col-span-2">
              <img
                className="aspect-video rounded-t-xl object-cover"
                width={1920}
                height={1080}
                src={frontMatter.coverImage}
                alt={frontMatter.title}
              />
              <div className="prose p-4 sm:p-10 max-w-full prose-gray transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold">
                <Document />
              </div>
            </div>
            <div className="sticky top-16 lg:top-1 col-span-1 hidden flex-col divide-y divide-gray-200 self-start sm:flex">
              <div className="flex flex-col gap-y-3 pt-2">
                <p className="text-sm font-semibold text-gray-800">Author</p>
                <a
                  className="group flex items-center gap-x-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={frontMatter.author.url}
                >
                  <img
                    alt={frontMatter.author.name}
                    loading="lazy"
                    width={44}
                    height={44}
                    className="rounded-full size-11 transition-all group-hover:brightness-90"
                    src={frontMatter.author.avatar}
                  />
                  <div>
                    <p className="hover:underline text-balance text-base leading-[none]">
                      {frontMatter.author.name}
                    </p>
                    <p className="font-medium text-xs text-gray-700">
                      {frontMatter.author.title}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
