import type { ReactNode } from "react";
import type { Metadata } from "next";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

const WELCOME: Record<Lang, string> = {
  hu: "Isten hozott!",
  ro: "Bine ai venit!",
  en: "Welcome!",
};

const SEO: Record<Lang, { title: string; description: string }> = {
  ro: {
    title: "AKKERT – Casă de weekend în Cluj",
    description: "Casă de weekend liniștită în Cluj-Napoca. Rezervare pe Airbnb.",
  },
  hu: {
    title: "AKKERT – Víkendház Kolozsváron",
    description: "Nyugodt víkendház Kolozsváron. Foglalás Airbnb-n.",
  },
  en: {
    title: "AKKERT – Weekend House in Cluj",
    description: "A calm weekend house in Cluj-Napoca. Book via Airbnb.",
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
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/92">
        <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 max-w-6xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium tracking-wide text-black/80">
              {WELCOME[lang]}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm text-black/55">
            <a href={`/${lang}#top`} className="hover:text-black/80 transition">
              {lang === "hu" ? "Kezdőlap" : lang === "ro" ? "Acasă" : "Home"}
            </a>
            <a
              href={`/${lang}#about`}
              className="hover:text-black/80 transition"
            >
              {lang === "hu" ? "Rólunk" : lang === "ro" ? "Despre noi" : "About"}
            </a>
            <a
              href={`/${lang}#gallery`}
              className="hover:text-black/80 transition"
            >
              {lang === "hu" ? "Galéria" : lang === "ro" ? "Galerie" : "Gallery"}
            </a>
            <a
              href={`/${lang}#contact`}
              className="hover:text-black/80 transition"
            >
              {lang === "hu"
                ? "Kapcsolat"
                : lang === "ro"
                ? "Contact"
                : "Contact"}
            </a>
          </nav>

          <LanguageSwitcher currentLang={lang} />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t bg-white/92">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-4 text-center text-xs text-black/40">
          © 2026 AKKERT
        </div>
      </footer>
    </div>
  );
}
