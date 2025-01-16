import { dateFormat, getParentMetadata } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { posts } from "@/collections";
import { notFound } from "next/navigation";
import * as fs from "node:fs/promises";
import { MDXContent } from "renoun/components";
import { remarkPlugins } from "renoun/mdx";
import { components } from "@/mdx-components";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const allPosts = await posts.getEntries();
  return allPosts.map((post) => ({ slug: post.getName() }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const prevMetadata = await getParentMetadata(parent);
  const post = await posts.getFile((await params).slug, "mdx");
  if (!post) return prevMetadata;

  const frontmatter = await post.getExportValueOrThrow("frontmatter");
  const title = frontmatter.title;

  return {
    title,
    description: frontmatter.description,
    authors: {
      url: frontmatter.author.url,
      name: frontmatter.author.name,
    },
    category: frontmatter.categories?.join(", "),
    openGraph: {
      ...(prevMetadata?.openGraph ?? {}),
      title,
      description: frontmatter.description,
      images: frontmatter.coverImage,
    },
    twitter: {
      ...(prevMetadata?.twitter ?? {}),
      title,
      description: frontmatter.description,
      images: frontmatter.coverImage,
    },
  };
}

export default async function Page({ params }: Props) {
  const post = await posts.getFile((await params).slug, "mdx");
  if (!post) return notFound();
  const frontMatter = await post.getExportValueOrThrow("frontmatter");
  const Content = await post.getExportValueOrThrow("default");

  const content = await fs.readFile(post.getAbsolutePath(), "utf-8");

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
                <MDXContent
                  remarkPlugins={remarkPlugins}
                  components={components}
                  value={content}
                />
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

function removeFrontMatter(markdown: string) {
  const frontMatterRegex = /^---[\s\S]*?---[\r\n]+/;
  return markdown.replace(frontMatterRegex, "").trimStart();
}
