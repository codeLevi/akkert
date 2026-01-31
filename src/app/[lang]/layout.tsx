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

  const NAV: Record<Lang, { top: string; about: string; gallery: string; contact: string }> =
    {
      hu: { top: "Kezdőlap", about: "Rólunk", gallery: "Galéria", contact: "Kapcsolat" },
      ro: { top: "Acasă", about: "Despre", gallery: "Galerie", contact: "Contact" },
      en: { top: "Home", about: "About", gallery: "Gallery", contact: "Contact" },
    };

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="relative flex h-14 items-center">
            {/* LEFT */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium tracking-wide text-black/80">
                {WELCOME[lang]}
              </span>
            </div>

            {/* CENTER NAV (no Offer) */}
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 text-sm text-black/60">
              <a href="#top" className="hover:text-black/85 transition">
                {NAV[lang].top}
              </a>
              <a href="#about" className="hover:text-black/85 transition">
                {NAV[lang].about}
              </a>
              <a href="#gallery" className="hover:text-black/85 transition">
                {NAV[lang].gallery}
              </a>
              <a href="#contact" className="hover:text-black/85 transition">
                {NAV[lang].contact}
              </a>
            </nav>

            {/* RIGHT */}
            <div className="ml-auto">
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-3 text-center text-xs text-black/40">
          © 2026 AKKERT
        </div>
      </footer>
    </div>
  );
}
