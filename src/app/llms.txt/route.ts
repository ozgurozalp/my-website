import { posts } from "@/collections";

const SITE_URL = "https://ozgurozalp.com";

/**
 * llms.txt: dil modellerinin siteyi tararken okuyacağı özet.
 * Yazı listesi content'ten üretilir ki yeni yazı eklendiğinde elle
 * güncellemek gerekmesin — sitemap.ts ile aynı yaklaşım.
 */
export async function GET() {
  const allPosts = await posts.getEntries();

  const entries = await Promise.all(
    allPosts.map(async (post) => {
      const frontMatter = await post.getExportValue("frontmatter");
      return {
        path: post.getPath(),
        title: frontMatter.title,
        description: frontMatter.description ?? "",
        createdAt: frontMatter.createdAt,
      };
    }),
  );

  entries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const lines = [
    "# Özgür ÖZALP",
    "",
    "> İstanbul merkezli full stack geliştirici. React, Next.js, TypeScript, Node.js ve PHP ile çalışıyor. Bu site kişisel blogu ve projelerinin vitrini.",
    "",
    "Yazılar ağırlıklı olarak Türkçe ve yazılım geliştirme üzerine: JavaScript ekosistemi, frontend, yapay zeka araçları ve geliştirdiği projelerin arka planı.",
    "",
    "## Sayfalar",
    "",
    `- [Ana sayfa](${SITE_URL}/): Kısa tanıtım ve bağlantılar.`,
    `- [Hakkımda](${SITE_URL}/about): Özgeçmiş, kullandığı teknolojiler ve iletişim.`,
    `- [Blog](${SITE_URL}/blog): Tüm yazıların listesi.`,
    "",
    "## Blog yazıları",
    "",
    ...entries.map(
      (entry) =>
        `- [${entry.title}](${SITE_URL}/blog${entry.path})${
          entry.description ? `: ${entry.description}` : ""
        }`,
    ),
    "",
    "## Projeler",
    "",
    `- [Taş Kağıt Makas](https://taskagitmakas.online/): Gerçek zamanlı, çok oyunculu taş kağıt makas oyunu (Nuxt 3, Socket.IO, Redis). İngilizcesi: https://rock.paperscissors.online/`,
    "- [Unfolks](https://unfolks.com/): Instagram'da geri takip etmeyenleri gösteren Chrome eklentisi.",
    "",
    "## İletişim",
    "",
    "- GitHub: https://github.com/ozgurozalp",
    "- X: https://x.com/ozqurozalp",
    "- LinkedIn: https://www.linkedin.com/in/ozgurozalp",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
