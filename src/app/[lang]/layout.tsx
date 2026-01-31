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
    description: "Oază verde în oraș. Locație pentru familie, evenimente și relaxare. Rezervare pe Airbnb.",
  },
  hu: {
    title: "AKKERT – Víkendház Kolozsváron",
    description: "Zöld oázis a városban. Családi élmények, események, pihenés. Foglalás Airbnb-n.",
  },
  en: {
    title: "AKKERT – Weekend House in Cluj",
    description: "Green oasis in the city. Family-friendly place for events and relaxing time. Book via Airbnb.",
  },
};

const NAV: Record<
  Lang,
  { home: string; about: string; gallery: string; contact: string }
> = {
  ro: { home: "Acasă", about: "Despre noi", gallery: "Galerie", contact: "Contact" },
  hu: { home: "Kezdőlap", about: "Rólunk", gallery: "Galéria", contact: "Kapcsolat" },
  en: { home: "Home", about: "About", gallery: "Gallery", contact: "Contact" },
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

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="
        text-[13px] md:text-[14px]
        font-normal tracking-[0.06em]
        uppercase text-black/60
        hover:text-black/90
        transition
      "
    >
      {label}
    </a>
  );
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
  const t = NAV[lang];

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header
        className="
          sticky top-0 z-50 border-b
          bg-white/70 backdrop-blur
          transition-all duration-300
          supports-[animation-timeline:scroll()]:animate-header-shrink
        "
      >
        <div
          className="
            mx-auto grid w-full grid-cols-3 items-center
            px-6 py-5 md:px-10
            transition-all duration-300
            supports-[animation-timeline:scroll()]:animate-header-inner
          "
        >
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <a href={`/${lang}#top`} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[15px] font-normal tracking-[0.02em] text-black/85">
                {WELCOME[lang]}
              </span>
            </a>
          </div>

          {/* CENTER NAV (desktop) */}
          <nav className="hidden md:flex justify-center gap-8">
            <NavLink href={`/${lang}#top`} label={t.home} />
            <NavLink href={`/${lang}#about`} label={t.about} />
            <NavLink href={`/${lang}#gallery`} label={t.gallery} />
            <NavLink href={`/${lang}#contact`} label={t.contact} />
          </nav>

          {/* RIGHT */}
          <div className="flex justify-end">
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden border-t bg-white/40">
          <div className="mx-auto flex justify-around px-4 py-2">
            <NavLink href={`/${lang}#top`} label={t.home} />
            <NavLink href={`/${lang}#about`} label={t.about} />
            <NavLink href={`/${lang}#gallery`} label={t.gallery} />
            <NavLink href={`/${lang}#contact`} label={t.contact} />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t bg-white/60 backdrop-blur">
        <div className="mx-auto px-4 py-3 text-center text-xs text-black/40">
          © 2026 AKKERT
        </div>
      </footer>
    </div>
  );
}
