export const CATEGORIES = [
  {
    name: "JavaScript",
    slug: "javascript",
  },
  {
    name: "TypeScript",
    slug: "typescript",
  },
  {
    name: "React",
    slug: "react",
  },
  {
    name: "Vue",
    slug: "vue",
  },
  {
    name: "HTML",
    slug: "html",
  },
  {
    name: "CSS",
    slug: "css",
  },
] as const;

export type Category = (typeof CATEGORIES)[number]["slug"];
