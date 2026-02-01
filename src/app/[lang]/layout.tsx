import type { ReactNode } from "react";
import type { Metadata } from "next";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import Icon from "@/components/Icon";
import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

import hu from "@/messages/hu.json";
import ro from "@/messages/ro.json";
import en from "@/messages/en.json";

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

type MessagesShape = {
  contact: {
    whatsapp: string;
    instagram: string;
    facebook: string;
    airbnb: string;
    maps: string;
  };
};

const MESSAGES: Record<Lang, MessagesShape> = {
  hu: hu as unknown as MessagesShape,
  ro: ro as unknown as MessagesShape,
  en: en as unknown as MessagesShape,
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
  const t = MESSAGES[lang];

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER (agency-ish) */}
      <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto w-full px-6 md:px-12">
          <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center">
            {/* LEFT */}
            <div className="flex items-center gap-3 justify-self-start">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="leading-none">
                <div className="text-sm font-medium tracking-[0.14em] text-black/80">
                  AKKERT
                </div>
                <div className="mt-1 text-xs text-black/45">{WELCOME[lang]}</div>
              </div>
            </div>

            {/* CENTER (perfect center) */}
            <nav className="justify-self-center">
              <ul className="flex items-center gap-8 text-xs uppercase tracking-[0.16em] text-black/55">
                <li>
                  <a className="hover:text-black/80 transition" href="#top">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-black/80 transition" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="hover:text-black/80 transition" href="#gallery">
                    Gallery
                  </a>
                </li>
                <li>
                  <a className="hover:text-black/80 transition" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* RIGHT */}
            <div className="flex items-center justify-self-end gap-4">
              <div className="hidden md:flex items-center gap-3 text-black/55">
                <a
                  href={t.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black/80 transition"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Icon name="instagram" className="h-4 w-4" />
                </a>
                <a
                  href={t.contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black/80 transition"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Icon name="facebook" className="h-4 w-4" />
                </a>
              </div>

              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t bg-white/60 backdrop-blur">
        <div className="mx-auto px-6 md:px-12 py-3 text-center text-xs text-black/40">
          © 2026 AKKERT
        </div>
      </footer>
    </div>
  );
}
