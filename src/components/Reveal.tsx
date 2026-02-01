"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  offsetY = 10,
  durationMs = 700,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  offsetY?: number;
  durationMs?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={[
        "will-change-transform will-change-opacity",
        className,
      ].join(" ")}
      style={{
        transition: `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transform: visible ? "translateY(0px)" : `translateY(${offsetY}px)`,
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
