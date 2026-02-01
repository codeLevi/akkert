"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero({
  title,
  motto,
  imageSrc = "/hero.jpg",
}: {
  title: string;
  motto: string;
  imageSrc?: string;
}) {
  const [style, setStyle] = useState<{ opacity: number; y: number }>({
    opacity: 1,
    y: 0,
  });
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        // finom scroll-fade és parallax a szövegre
        const fade = Math.max(0, Math.min(1, 1 - y / 380));
        const ty = Math.min(18, y / 18);
        setStyle({ opacity: fade, y: ty });
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt="AKKERT"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* overlay (stabil, nincs remegés) */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto h-full max-w-7xl px-4 md:px-8">
        <div
          className="absolute left-4 md:left-8 bottom-20 md:bottom-24 max-w-xl"
          style={{
            opacity: style.opacity,
            transform: `translateY(${style.y}px)`,
          }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#f3f2ee]/80">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#e6e4dd]/70">
            {motto}
          </p>
        </div>
      </div>
    </section>
  );
}
