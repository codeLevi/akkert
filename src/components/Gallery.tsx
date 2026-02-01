"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type GalleryProps = {
  images: { src: string; alt?: string }[];
};

function clamp(i: number, n: number) {
  if (n <= 0) return 0;
  return (i + n) % n;
}

export default function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = useMemo(() => {
    if (!images.length) return null;
    const i = clamp(index, images.length);
    return { ...images[i], i };
  }, [images, index]);

  const close = () => setOpen(false);
  const next = () => setIndex((i) => clamp(i + 1, images.length));
  const prev = () => setIndex((i) => clamp(i - 1, images.length));

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

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!images.length) {
    return (
      <div className="border bg-white p-10 text-sm text-black/50">
        No images yet.
      </div>
    );
  }

  const lightbox =
    open && current ? (
      <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
        <div className="absolute inset-0 bg-black/85" onPointerDown={close} />

        <div className="absolute inset-0 pointer-events-none">
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
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <button
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="pointer-events-auto fixed left-4 md:left-8 top-1/2 -translate-y-1/2 border border-white/30 bg-white/10 px-3 py-2 text-white/85 hover:bg-white/20 transition"
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
            className="pointer-events-auto fixed right-4 md:right-8 top-1/2 -translate-y-1/2 border border-white/30 bg-white/10 px-3 py-2 text-white/85 hover:bg-white/20 transition"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 auto-rows-[170px] md:auto-rows-[240px]">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative overflow-hidden border bg-white"
            aria-label="Open image"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              quality={65}
            />

            {/* designer film-ish overlay (olcsó) */}
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-80" />
          </button>
        ))}
      </div>

      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
