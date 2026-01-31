"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type GalleryProps = {
  images: { src: string; alt?: string }[];
};

function clampIndex(i: number, n: number) {
  if (n <= 0) return 0;
  return (i + n) % n;
}

export default function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const hasImages = images.length > 0;

  useEffect(() => setMounted(true), []);

  const current = useMemo(() => {
    if (!hasImages) return null;
    const i = clampIndex(index, images.length);
    return { ...images[i], i };
  }, [images, index, hasImages]);

  const close = () => setOpen(false);
  const next = () => setIndex((i) => clampIndex(i + 1, images.length));
  const prev = () => setIndex((i) => clampIndex(i - 1, images.length));

  // Keyboard controls
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  // Scroll lock
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!hasImages) {
    return (
      <div className="border bg-white p-10 text-sm text-black/50">
        No images yet.
      </div>
    );
  }

  const lightbox =
    open && current ? (
      <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/85" onPointerDown={close} />

        {/* UI LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          {/* TOP BAR */}
          <div className="pointer-events-auto absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
            <div className="text-xs text-white/70">
              {current.i + 1} / {images.length}
            </div>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="text-white/80 hover:text-white transition text-sm"
            >
              Close
            </button>
          </div>

          {/* IMAGE CENTER */}
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
            <div
              className="pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.alt ?? ""}
                className="max-h-[calc(100vh-6rem)] max-w-full object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* ARROWS (fixed position) */}
          <button
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="
              pointer-events-auto
              fixed left-4 md:left-8
              top-1/2 -translate-y-1/2
              border border-white/30
              bg-white/10
              px-3 py-2
              text-white/85
              hover:bg-white/20
              transition
            "
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
              next();
            }}
            className="
              pointer-events-auto
              fixed right-4 md:right-8
              top-1/2 -translate-y-1/2
              border border-white/30
              bg-white/10
              px-3 py-2
              text-white/85
              hover:bg-white/20
              transition
            "
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* GRID */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 auto-rows-[170px] md:auto-rows-[240px]">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative overflow-hidden border text-left"
            aria-label="Open image"
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="
                h-full w-full object-cover
                transition-transform duration-500 ease-out
                group-hover:scale-[1.02]
                [transform:translateZ(0)]
              "
            />

            {/* cinematic overlays (lightweight) */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-80" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-white/[0.03]" />
          </button>
        ))}
      </div>

      {/* PORTAL */}
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
