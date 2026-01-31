import Image from "next/image";
import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

import hu from "@/messages/hu.json";
import ro from "@/messages/ro.json";
import en from "@/messages/en.json";

type MessagesShape = {
  motto: string;
  about: { title: string; text: string[] };
  offer: { title: string; items: string[] };
  contact: { title: string; phone: string; address: string; airbnb: string };
};

const MESSAGES: Record<Lang, MessagesShape> = { hu, ro, en };

export default function Page({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
  const t = MESSAGES[lang];

  return (
    <main className="w-full">
      {/* HERO (image stays + only name + motto) */}
      <section id="top" className="relative h-[70vh] min-h-[520px] w-full">
        <Image
          src="/hero.jpg"
          alt="AKKERT"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white">
            AKKERT
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/85">
            {t.motto}
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-24 md:px-8">
        <h2 className="text-2xl font-medium text-black/90">{t.about.title}</h2>

        <div className="mt-6 space-y-4 text-black/65">
          {t.about.text.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* OFFER */}
      <section id="offer" className="mx-auto max-w-5xl px-4 py-24 md:px-8">
        <h2 className="text-2xl font-medium text-black/90">{t.offer.title}</h2>

        <ul className="mt-6 grid gap-4 md:grid-cols-2 text-black/70">
          {t.offer.items.map((o, i) => (
            <li key={i} className="border bg-white p-4">
              {o}
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-5xl px-4 py-24 md:px-8"
      >
        <h2 className="text-2xl font-medium text-black/90">
          {t.contact.title}
        </h2>

        <div className="mt-6 space-y-2 text-black/70">
          <p>📞 {t.contact.phone}</p>
          <p>📍 {t.contact.address}</p>
        </div>

        <div className="mt-8">
          <a
            href={t.contact.airbnb}
            target="_blank"
            rel="noreferrer"
            className="inline-block border px-5 py-3 text-sm text-black/80 hover:bg-black/5 transition"
          >
            Airbnb
          </a>
        </div>
      </section>
    </main>
  );
}
