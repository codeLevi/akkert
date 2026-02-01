"use client";

import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Lang } from "@/i18n/languages";

const WELCOME: Record<Lang, string> = {
  hu: "Isten hozott!",
  ro: "Bine ai venit!",
  en: "Welcome!",
};

const NAV: Record<Lang, { top: string; about: string; gallery: string; contact: string }> = {
  hu: { top: "Kezdőlap", about: "Rólunk", gallery: "Galéria", contact: "Kapcsolat" },
  ro: { top: "Acasă", about: "Despre", gallery: "Galerie", contact: "Contact" },
  en: { top: "Home", about: "About", gallery: "Gallery", contact: "Contact" },
};

export default function Header({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setScrolled(y > 8);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/92">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div
          className={[
            "relative flex items-center transition-all duration-300",
            scrolled ? "h-12" : "h-14",
          ].join(" ")}
        >
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium tracking-wide text-black/80">
              {WELCOME[lang]}
            </span>
          </div>

          {/* CENTER NAV (egy tengelyen) */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm text-black/55 leading-none">
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
  );
}
