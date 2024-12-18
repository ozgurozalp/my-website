import { Metadata, ResolvingMetadata } from "next";
import { getParentMetadata } from "@/lib/utils";

export async function generateMetadata(
  params: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const prevMetadata = await getParentMetadata(parent);
  const title = "Özgür ÖZALP Kimdir?";
  const description =
    "Merhaba, ben Özgür Özalp! İstanbul'da yaşayan bir yazılım geliştiricisiyim ve frontend ile fullstack geliştirme konularında uzmanım. React, Next.js, TypeScript, JavaScript, Tailwind CSS, Shadcn ...";

  return {
    ...prevMetadata,
    title,
    description,
    openGraph: {
      ...(prevMetadata?.openGraph ?? {}),
      title,
      description,
    },
    twitter: {
      ...(prevMetadata?.twitter ?? {}),
      title,
      description,
    },
  };
}

export default function Page() {
  return (
    <article>
      <div className="flex flex-col">
        <div className="container">
          <div className="flex flex-col gap-4 pt-4">
            <h1 className="blog-card-title max-w-2xl">Hakkımda</h1>
          </div>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-52 h-[calc(100%-13rem)] w-full border-t border-gray-200 bg-background" />
          <div className="w-full container grid grid-cols-3 gap-5 pt-4 md:pt-10 lg:gap-10">
            <div className="relative col-span-3 flex flex-col bg-white sm:rounded-t-xl sm:border !border-b-0 sm:border-gray-200 md:col-span-2">
              <img
                className="aspect-video rounded-t-xl object-contain"
                width={1920}
                height={1080}
                src="/ozgurozalp.png"
                alt="Özgür Özalp"
              />
              <div className="prose p-4 sm:p-10 max-w-full prose-gray transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold">
                <p>Merhaba</p>
                <p>
                  Ben <strong>Özgür Özalp</strong>! İstanbul&apos;da yaşayan bir
                  yazılım geliştiricisiyim ve frontend ile fullstack geliştirme
                  konularında uzmanım. React, Next.js, TypeScript, JavaScript,
                  Tailwind CSS, Shadcn ve daha birçok modern teknolojiyle
                  projeler geliştirmekteyim.
                </p>
                <p>
                  Teknoloji dünyasına olan ilgim sadece yazılımla sınırlı değil;
                  RabbitMQ ve Kafka gibi ileri seviye araçlarla da çalışıyorum.
                  Aynı zamanda açık kaynak projelere katkı sağlamaktan ve
                  fikirlerimi paylaşmaktan keyif alıyorum.
                </p>
                <p>
                  Web oyunları, Chrome eklentileri ve özelleştirilebilir
                  kullanıcı arayüzleri gibi farklı alanlarda yaratıcı projeler
                  geliştiriyorum. Örneğin,{" "}
                  <a target="_blank" href="https://taskagitmakas.online/">
                    taskagitmakas.online
                  </a>{" "}
                  adlı eğlenceli bir web oyunu ve Instagram&apos;da sizi takip
                  etmeyenleri bulabileceğiniz{" "}
                  <a target="_blank" href="https://unfolks.com/">
                    Unfolks
                  </a>{" "}
                  adında bir Chrome eklentisi geliştirdim.{" "}
                </p>
                <p>
                  Aynı zamanda romantik ve keyifli bir hayata inanıyor, iş
                  dışında ise zamanımı kız arkadaşım Zeynep ile geçiriyor,
                  yaratıcı fikirler üzerine sohbet etmeyi seviyorum.
                  İstanbul&apos;da olup uzaktan çalışma modelini tercih ediyor
                  ve teknolojiyle sınırları zorlamayı hedefliyorum.
                </p>
                <p>
                  Eğer projelerimle ilgili bilgi almak veya benimle çalışmak
                  isterseniz, iletişime geçmekten çekinmeyin!
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:mail@ozgurozalp.com">mail@ozgurozalp.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
