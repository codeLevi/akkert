import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

export default function Page({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;

  const title: Record<Lang, string> = {
    ro: "Contact",
    hu: "Kapcsolat",
    en: "Contact",
  };

  const whatsappLabel: Record<Lang, string> = {
    ro: "WhatsApp",
    hu: "WhatsApp",
    en: "WhatsApp",
  };

  const fbLabel: Record<Lang, string> = {
    ro: "Facebook",
    hu: "Facebook",
    en: "Facebook",
  };

  const igLabel: Record<Lang, string> = {
    ro: "Instagram",
    hu: "Instagram",
    en: "Instagram",
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
      <h1 className="text-2xl font-semibold text-black/90">{title[lang]}</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <a
          className="rounded-3xl border bg-white/70 p-6 backdrop-blur hover:bg-white transition"
          href="https://wa.me/40724508266"
          target="_blank"
          rel="noreferrer"
        >
          {whatsappLabel[lang]}
        </a>

        <a
          className="rounded-3xl border bg-white/70 p-6 backdrop-blur hover:bg-white transition"
          href="https://www.facebook.com/akkert25"
          target="_blank"
          rel="noreferrer"
        >
          {fbLabel[lang]}
        </a>

        <a
          className="rounded-3xl border bg-white/70 p-6 backdrop-blur hover:bg-white transition"
          href="https://www.instagram.com/akkertben/"
          target="_blank"
          rel="noreferrer"
        >
          {igLabel[lang]}
        </a>
      </div>
    </div>
  );
}
