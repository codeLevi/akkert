"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroOverlayText({
  title,
  motto,
}: {
  title: string;
  motto: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{ opacity: number; transform: string }>({
    opacity: 1,
    transform: "translateY(0px)",
  });

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;

        // We fade based on how much the page scrolled past the hero start.
        // Smooth + predictable.
        const hero = el.closest<HTMLElement>("[data-hero]");
        const heroHeight = hero?.offsetHeight ?? 600;

        const y = window.scrollY;
        const fadeDistance = Math.max(220, Math.floor(heroHeight * 0.55)); // ~55% of hero
        const p = Math.min(1, Math.max(0, y / fadeDistance)); // 0..1

        const opacity = 1 - p * 0.85; // keep a little presence
        const ty = p * 10; // subtle drift down

        setStyle({
          opacity,
          transform: `translateY(${ty}px)`,
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute left-6 md:left-8 bottom-24 md:bottom-28 max-w-xl"
      style={style}
    >
      {/* Gradient only behind text */}
      <div className="absolute -inset-x-6 -inset-y-6 md:-inset-x-8 md:-inset-y-8 pointer-events-none hero-text-gradient" />

      <h1 className="relative text-5xl md:text-7xl font-semibold tracking-tight text-white/80">
        {title}
      </h1>

      <p className="relative mt-4 text-lg md:text-xl text-white/70">
        {motto}
      </p>
    </div>
  );
}
