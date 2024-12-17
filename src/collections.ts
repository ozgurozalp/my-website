import { Directory, isFile } from "renoun/file-system";
import type { MDXContent } from "renoun/mdx";
import { z } from "zod";

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  coverImage: z.string(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  author: z.object({
    name: z.string(),
    title: z.string(),
    url: z.string().url(),
    avatar: z.string().url(),
  }),
});

interface PostType {
  default: MDXContent;
  frontmatter: z.infer<typeof frontmatterSchema>;
}

export const posts = new Directory<{ mdx: PostType }>({
  path: "src/posts",
})
  .withSchema("mdx", { frontmatter: frontmatterSchema.parse })
  .withModule((path) => import(`./posts/${path}`))
  .withFilter((entry) => isFile(entry, "mdx"))
  .withSort(async (a, b) => {
    const aFrontmatter = await a.getExportValueOrThrow("frontmatter");
    const bFrontmatter = await b.getExportValueOrThrow("frontmatter");

    return bFrontmatter.createdAt.getTime() - aFrontmatter.createdAt.getTime();
  });
