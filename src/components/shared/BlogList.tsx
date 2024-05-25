import { BlogCard } from "@/components/shared/blog-card";
import { allBlogs } from "@/../content";
import { Category } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BlogListProps {
  category?: Category;
}

export default function BlogList({ category }: BlogListProps) {
  const blogs = allBlogs
    .all()
    .filter(
      (blog) => !category || blog.frontMatter.categories.includes(category),
    );

  if (blogs.length === 0) {
    return <NotFound category={category} />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          blog={blog}
          className={cn(blogs.length === 1 && "!h-fit")}
        />
      ))}
    </div>
  );
}

function NotFound({ category }: { category?: Category }) {
  return (
    <div className="flex items-center">
      <div className="uppercase border-2 border-[--brand] rounded-3xl w-fit mx-auto p-6 sm:p-8 text-center sm:text-[1.875rem]">
        <h1>
          No blogs found in{" "}
          {category ? `category '${category}'` : "this website"}
        </h1>
      </div>
    </div>
  );
}
