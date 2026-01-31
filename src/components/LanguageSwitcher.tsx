"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUPPORTED_LANGS, type Lang } from "@/i18n/languages";

function replaceLangInPath(pathname: string, newLang: Lang) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${newLang}`;

  const first = parts[0];
  const rest = parts.slice(1);

  if ((SUPPORTED_LANGS as readonly string[]).includes(first)) {
    const tail = rest.length ? `/${rest.join("/")}` : "";
    return `/${newLang}${tail}`;
  }

  return `/${newLang}/${parts.join("/")}`;
}

export default function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  const pathname = usePathname() || "/";

  return (
    <div className="flex items-center gap-1 rounded-full border bg-white/60 p-1 backdrop-blur">
      {SUPPORTED_LANGS.map((lang) => {
        const href = replaceLangInPath(pathname, lang);
        const active = lang === currentLang;

        return (
          <Link
            key={lang}
            href={href}
            className={[
              "rounded-full px-3 py-1 text-xs tracking-wide transition",
              active ? "bg-black text-white" : "text-black/70 hover:bg-black/5 hover:text-black",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {lang.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
