"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (media?.matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={[
        "transition-[opacity,transform,filter] duration-700 ease-out will-change-[opacity,transform]",
        shown
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-3 blur-[1px]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
