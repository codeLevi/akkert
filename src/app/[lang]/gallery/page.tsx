import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

export default function Page({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;

  const title: Record<Lang, string> = {
    ro: "Galerie",
    hu: "Galéria",
    en: "Gallery",
  };

  // Minimál: most csak a hero-t mutatjuk; később bővíted több képre
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
      <h1 className="text-2xl font-semibold text-black/90">{title[lang]}</h1>
      <div className="mt-6 overflow-hidden rounded-3xl border bg-white/70 backdrop-blur">
        <img src="/hero.jpg" alt="" className="h-[420px] w-full object-cover" />
      </div>
    </div>
  );
}
