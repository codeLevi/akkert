"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;     // ms
  duration?: number;  // ms
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 700,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [tick, setTick] = useState(0);

  // Basic in-view observer (once it enters, keep it "on")
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Continuous subtle motion on scroll (very cheap)
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTick((t) => (t + 1) % 100000));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Calculate tiny offset based on element position (parallax micro)
  let extraY = 0;
  if (!prefersReducedMotion() && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const center = rect.top + rect.height / 2;
    const norm = (center - vh / 2) / (vh / 2); // -1..1 roughly
    extraY = Math.max(-6, Math.min(6, norm * 6)); // clamp to subtle range
  }

  const style: React.CSSProperties = prefersReducedMotion()
    ? {}
    : {
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView
          ? `translate3d(0, ${extraY}px, 0)`
          : "translate3d(0, 14px, 0)",
        willChange: "transform, opacity",
      };

  // use tick so it updates on scroll (even if inView already true)
  void tick;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
