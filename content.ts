import { createSource } from "mdxts";

export type BlogMeta = {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  coverImage: string;
  author: {
    name: string;
    url: string;
    title: string;
    avatar: string;
  };
  categories: string[];
};

export const allBlogs = createSource<{
  frontMatter: BlogMeta;
}>("blogs/*.mdx", {
  baseDirectory: "blogs",
  basePathname: "/blog",
  sort: (a, b) => {
    return (
      b.frontMatter.createdAt.getTime() - a.frontMatter.createdAt.getTime()
    );
  },
});
