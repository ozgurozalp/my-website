import { BlogCard } from "@/components/shared/blog-card";
import { cn } from "@/lib/utils";
import { posts } from "@/collections";
import { Blog, BlogWithCategory } from "@/types";
import NotFound from "@/components/shared/not-found";

interface BlogListProps {
  category?: string;
}

async function getPostWithCategory(blog: Blog) {
  const frontMatter = await blog.getExportValueOrThrow("frontmatter");
  // @ts-ignore
  blog.categories = frontMatter?.categories ?? [];
  return blog as BlogWithCategory;
}

async function listBlogWithCategory() {
  const allPosts = await posts.getEntries();
  return Promise.all(allPosts.map(getPostWithCategory));
}

export default async function BlogList({ category }: BlogListProps) {
  let allPosts = await listBlogWithCategory();

  if (category) {
    allPosts = allPosts.filter((blog) => blog.categories.includes(category));
  }

  if (allPosts.length === 0) {
    return <NotFound category={category} />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
      {allPosts.map((blog, index) => {
        return (
          <BlogCard
            key={index}
            blog={blog}
            className={cn("grow-0", allPosts.length < 2 && "!h-fit")}
          />
        );
      })}
    </div>
  );
}
