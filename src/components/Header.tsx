"use client";

import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Lang } from "@/i18n/languages";

const WELCOME: Record<Lang, string> = {
  hu: "Isten hozott!",
  ro: "Bine ai venit!",
  en: "Welcome!",
};

const NAV: Record<
  Lang,
  { top: string; about: string; gallery: string; contact: string }
> = {
  hu: { top: "Kezdőlap", about: "Rólunk", gallery: "Galéria", contact: "Kapcsolat" },
  ro: { top: "Acasă", about: "Despre", gallery: "Galerie", contact: "Contact" },
  en: { top: "Home", about: "About", gallery: "Gallery", contact: "Contact" },
};

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="
        relative text-xs uppercase tracking-[0.18em] leading-none
        text-black/45 hover:text-black/80 transition
        after:absolute after:left-0 after:-bottom-2 after:h-px after:w-full
        after:bg-black/30 after:scale-x-0 after:origin-left
        hover:after:scale-x-100 after:transition-transform
      "
    >
      {children}
    </a>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        setScrolled((window.scrollY || 0) > 8);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b bg-white/70 backdrop-blur",
        scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.08)]" : "shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* FIX magasság -> nincs layout shift, nincs hero remegés */}
        <div className="h-12 flex items-center">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium tracking-wide text-black/80">
              {WELCOME[lang]}
            </span>
          </div>

          {/* CENTER NAV */}
          <nav className="mx-auto hidden md:flex items-center gap-10">
            <NavLink href="#top">{NAV[lang].top}</NavLink>
            <NavLink href="#about">{NAV[lang].about}</NavLink>
            <NavLink href="#gallery">{NAV[lang].gallery}</NavLink>
            <NavLink href="#contact">{NAV[lang].contact}</NavLink>
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
