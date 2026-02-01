"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Hero({
  title,
  motto,
  imageSrc = "/hero.jpg",
}: {
  title: string;
  motto: string;
  imageSrc?: string;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // normalizált -0.5..0.5
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const prog = useMemo(() => clamp(scrollY / 420, 0, 1), [scrollY]);

  // scroll dinamika
  const opacity = 1 - prog * 0.75; // nem tűnik el teljesen
  const y = prog * 18; // lefelé csúszik finoman
  const scale = 1 - prog * 0.04; // enyhe zsugor
  const blur = prog * 1.2; // enyhe blur
  const tracking = 0.02 + prog * 0.06; // em alapú tracking érzet

  // mouse parallax
  const mx = mouse.x * 10;
  const my = mouse.y * 8;

  return (
    <section
      id="top"
      className="relative h-[70vh] min-h-[520px] w-full overflow-hidden"
    >
      <Image
        src={imageSrc}
        alt="AKKERT"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* tartó container tengelyhez */}
      <div className="relative z-10 h-full w-full px-6 md:px-10">
        <div className="absolute left-6 md:left-10 bottom-20 md:bottom-24 max-w-xl">
          <div
            className="will-change-transform"
            style={{
              opacity,
              transform: `translate3d(${mx}px, ${y + my}px, 0) scale(${scale})`,
              filter: `blur(${blur}px)`,
            }}
          >
            <h1
              className="text-5xl md:text-7xl font-semibold tracking-tight text-[#f3f2ee]/80"
              style={{
                letterSpacing: `${tracking}em`,
              }}
            >
              {title}
            </h1>

            <p
              className="mt-4 text-lg md:text-xl text-[#e6e4dd]/70"
              style={{
                transform: `translate3d(${mx * 0.35}px, ${my * 0.35}px, 0)`,
              }}
            >
              {motto}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
