import { cn, dateFormat } from "@/lib/utils";
import Link from "next/link";
import { BlogWithCategory } from "@/types";

interface BlogCardProps {
  blog: BlogWithCategory;
  className?: string;
}

export default async function BlogCard({ blog, className }: BlogCardProps) {
  const path = blog.getPath();
  const frontMatter = await blog.getExportValue("frontmatter");
  const url = `/blog${path}`;

  return (
    <article className={cn("blog-card-container", className)}>
      <Link className={cn("blog-card-cover")} href={url}>
        <img
          width={1980}
          height={1200}
          alt={frontMatter.title}
          src={frontMatter.coverImage}
          className="block object-cover aspect-video w-full h-full absolute inset-0"
        />
      </Link>
      <div className="md:p-8 flex flex-col gap-4 md:pt-0">
        <div className="flex flex-col gap-1">
          <div className="flex mt-auto justify-between">
            <time
              dateTime={frontMatter.createdAt.toString()}
              className={cn("blog-card-date")}
            >
              {dateFormat(frontMatter.createdAt)}
            </time>
            <div className={cn("blog-card-categories")}>
              {frontMatter.categories?.map(
                (category: string, index: number) => (
                  <Link
                    key={index}
                    className={cn("blog-card-tag-link")}
                    href={`/blog/category/${category}`}
                  >
                    #{category}
                  </Link>
                ),
              )}
            </div>
          </div>
          <Link href={url}>
            <h2 className={cn("blog-card-title")}>{frontMatter.title}</h2>
          </Link>
        </div>
        <p className={cn("blog-card-description")}>{frontMatter.description}</p>
        <div className={cn("blog-card-author")}>
          <figure className={cn("blog-card-author-figure")}>
            <span className="absolute inset-0 block">
              <img
                width={34}
                height={34}
                alt={frontMatter.author.name}
                src={frontMatter.author.avatar}
                className="rounded-full absolute h-full w-full object-cover inset-0"
              />
            </span>
          </figure>
          <div className="flex flex-col">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-balance text-base md:text-xl leading-[none]"
              href={frontMatter.author.url}
            >
              <span>{frontMatter.author.name}</span>
            </Link>
            <span className="text-sm leading-[none]">
              {frontMatter.author.title}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
