import type { MetadataRoute } from "next";
import { posts } from "@/collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await posts.getEntries();

  const mainUrls: MetadataRoute.Sitemap = [
    {
      url: "https://ozgurozalp.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ozgurozalp.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ozgurozalp.com/ben-kimim",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ozgurozalp.com/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  for (const post of allPosts) {
    const path = post.getPath();
    const frontMatter = await post.getExportValue("frontmatter");

    mainUrls.push({
      url: `https://ozgurozalp.com/blog${path}`,
      lastModified: frontMatter.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return mainUrls;
}
