"use server";
import { posts } from "@/collections";

export async function getCategories() {
  const allPosts = await posts.getEntries();
  const categories = new Set<string>();

  for (let post of allPosts) {
    const frontMatter = await post.getExportValue("frontmatter");
    for (let string of frontMatter.categories ?? []) {
      categories.add(string);
    }
  }

  return Array.from(categories);
}
