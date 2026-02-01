"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type SectionId = "top" | "about" | "gallery" | "contact";

function AgencyLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "relative select-none",
        "text-[11px] uppercase tracking-[0.28em] leading-none",
        "transition-colors",
        active ? "text-black/85" : "text-black/45 hover:text-black/80",
      ].join(" ")}
    >
      {label}
      <span
        className={[
          "pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-2 h-px w-8",
          "bg-black/60 transition-all duration-300",
          active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-75",
        ].join(" ")}
      />
    </a>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("top");
  const ticking = useRef(false);

  const items = useMemo(
    () => [
      { id: "top" as const, href: "#top", label: NAV[lang].top },
      { id: "about" as const, href: "#about", label: NAV[lang].about },
      { id: "gallery" as const, href: "#gallery", label: NAV[lang].gallery },
      { id: "contact" as const, href: "#contact", label: NAV[lang].contact },
    ],
    [lang]
  );

  // 1) vékony shadow csak ha scroll
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

  // 2) aktív menüpont = melyik szekció van viewportban
  useEffect(() => {
    const ids: SectionId[] = ["top", "about", "gallery", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // válasszuk a legnagyobb látható arányút
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      {
        // header miatt: kicsit lejjebb számítson "belépettnek"
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.05, 0.15, 0.3, 0.6],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b bg-white/70 backdrop-blur",
        scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.08)]" : "shadow-none",
      ].join(" ")}
    >
      {/* NINCS max-width doboz => elemek “szélen” */}
      <div className="w-full px-6 md:px-10">
        {/* fix magasság: nem remeg */}
        <div className="h-12 flex items-center">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium tracking-wide text-black/80">
              {WELCOME[lang]}
            </span>
          </div>

          {/* CENTER (agency) */}
          <nav className="mx-auto hidden md:flex items-center gap-12">
            {items.map((it) => (
              <AgencyLink
                key={it.id}
                href={it.href}
                label={it.label}
                active={active === it.id}
              />
            ))}
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
