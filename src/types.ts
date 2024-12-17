export type Blog = Awaited<
  ReturnType<typeof import("@/collections").posts.getEntries>
>[number];

export interface BlogWithCategory extends Blog {
  categories: string[];
}
