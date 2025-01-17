import { Directory, withSchema } from "renoun/file-system";
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
    avatar: z.string().url().or(z.string()),
  }),
});

export const posts = new Directory({
  path: "src/posts",
  include: "*.mdx",
  loaders: {
    mdx: withSchema(
      { frontmatter: frontmatterSchema },
      (path) => import(`./posts/${path}.mdx`),
    ),
  },
  sort: async (a, b) => {
    const aFrontmatter = await a.getExportValue("frontmatter");
    const bFrontmatter = await b.getExportValue("frontmatter");

    return bFrontmatter.createdAt.getTime() - aFrontmatter.createdAt.getTime();
  },
});
