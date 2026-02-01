"use client";

type Item = { href: string; src: string; label: string };

export default function SocialIcons({ items }: { items: Item[] }) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-8">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target="_blank"
            rel="noreferrer"
            aria-label={it.label}
            className="opacity-55 hover:opacity-90 transition-opacity"
          >
            <img
              src={it.src}
              alt=""
              className="h-5 w-5"
              loading="lazy"
              decoding="async"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
