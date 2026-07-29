const SITE_URL = "https://ozgurozalp.com";

export const PERSON_ID = `${SITE_URL}/#person`;
export const SITE_ID = `${SITE_URL}/#website`;

/**
 * Renders a structured-data block. `<` is escaped to < so a stray
 * "</script>" inside post content can't break out of the tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Site-wide Person + WebSite graph. Rendered once, in the root layout. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Özgür ÖZALP",
      url: SITE_URL,
      image: `${SITE_URL}/ozgurozalp.png`,
      jobTitle: "Full Stack Developer",
      description:
        "Full stack developer based in Istanbul, working with React, Next.js, TypeScript, Node.js and PHP.",
      email: "mailto:ozgurozalp1999@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Vue.js",
        "Node.js",
        "PHP",
        "Laravel",
        "Docker",
        "Kubernetes",
      ],
      sameAs: [
        "https://github.com/ozgurozalp",
        "https://x.com/ozqurozalp",
        "https://www.linkedin.com/in/ozgurozalp",
        "https://instagram.com/ozqurozalp",
      ],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      name: "Özgür ÖZALP",
      inLanguage: "tr-TR",
      publisher: { "@id": PERSON_ID },
    },
  ],
};

type PostGraphInput = {
  slug: string;
  title: string;
  description?: string;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: readonly string[];
  categories?: readonly string[];
};

/** BlogPosting + breadcrumb trail for a single post. */
export function postGraph({
  slug,
  title,
  description,
  coverImage,
  createdAt,
  updatedAt,
  tags,
  categories,
}: PostGraphInput) {
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: title,
        description,
        image: `${SITE_URL}${coverImage}`,
        datePublished: createdAt.toISOString(),
        dateModified: updatedAt.toISOString(),
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": SITE_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        // Blog yazıları Türkçe; site geneli aynı dilde olduğu için sabit.
        inLanguage: "tr-TR",
        ...(tags?.length ? { keywords: tags.join(", ") } : {}),
        ...(categories?.length ? { articleSection: categories } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  };
}
