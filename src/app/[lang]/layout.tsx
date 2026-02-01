import type { ReactNode } from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";
import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

const SEO: Record<Lang, { title: string; description: string }> = {
  ro: {
    title: "AKKERT – Casă de weekend în Cluj",
    description: "Grădină liniștită în Cluj-Napoca. Rezervare pe Airbnb.",
  },
  hu: {
    title: "AKKERT – Zöld oázis Kolozsváron",
    description: "Zöld menedék Kolozsvár szívében. Foglalás Airbnb-n.",
  },
  en: {
    title: "AKKERT – Green oasis in Cluj",
    description: "A calm green oasis in Cluj-Napoca. Book via Airbnb.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
  const seo = SEO[lang];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ro: "/ro", hu: "/hu", en: "/en" },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/${lang}`,
      siteName: "AKKERT",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og.jpg"],
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
