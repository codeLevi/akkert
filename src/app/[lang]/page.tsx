import Image from "next/image";
import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

import hu from "@/messages/hu.json";
import ro from "@/messages/ro.json";
import en from "@/messages/en.json";

import Gallery from "@/components/Gallery";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

type MessagesShape = {
  motto: string;
  about: { title: string; text: string[] };
  gallery: { title: string };
  contact: {
    title: string;
    phone: string;
    address: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    airbnb: string;
    maps: string;
  };
  // ha a JSON-ban ott maradt, nem baj
  offer?: unknown;
};

const MESSAGES: Record<Lang, MessagesShape> = { hu, ro, en };

// 18 kép: /public/gallery/01.jpg ... /18.jpg
const GALLERY_IMAGES: { src: string; alt?: string }[] = Array.from(
  { length: 18 },
  (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { src: `/gallery/${n}.jpg`, alt: `AKKERT ${n}` };
  }
);

export default function Page({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
  const t = MESSAGES[lang];

  return (
    <main className="w-full">
      {/* HERO */}
      <section id="top" className="relative h-[70vh] min-h-[520px] w-full">
        <Image
          src="/hero.jpg"
          alt="AKKERT"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-8">
          <div className="absolute left-6 md:left-8 bottom-24 md:bottom-28 max-w-xl">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#f3f2ee]/80">
                AKKERT
              </h1>
              <p className="mt-4 text-lg md:text-xl text-[#e6e4dd]/70">
                {t.motto}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-5xl px-6 py-24 md:px-8 scroll-mt-32
                   [content-visibility:auto] [contain-intrinsic-size:1px_720px]"
      >
        <Reveal>
          <h2 className="text-2xl font-medium text-black/90">{t.about.title}</h2>

          <div className="mt-6 space-y-4 text-black/65">
            {t.about.text.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="mx-auto max-w-6xl px-6 py-24 md:px-8 scroll-mt-32
                   [content-visibility:auto] [contain-intrinsic-size:1px_980px]"
      >
        <Reveal>
          <h2 className="text-2xl font-medium text-black/90">
            {t.gallery.title}
          </h2>

          <div className="mt-8">
            <Gallery images={GALLERY_IMAGES} />
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-5xl px-6 py-24 md:px-8 scroll-mt-32
                   [content-visibility:auto] [contain-intrinsic-size:1px_640px]"
      >
        <Reveal>
          <h2 className="text-2xl font-medium text-black/90">
            {t.contact.title}
          </h2>

          {/* sorrend: telefonszám, cím, ikonok */}
          <div className="mt-6 space-y-2 text-black/70">
            <p>📞 {t.contact.phone}</p>
            <p>📍 {t.contact.address}</p>
          </div>

          {/* ikonok: alul középen (csak amik léteznek az Icon.tsx-ben) */}
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-8 text-black/70">
              <a
                href={t.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="opacity-55 hover:opacity-90 transition-opacity"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
              </a>

              <a
                href={t.contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="opacity-55 hover:opacity-90 transition-opacity"
              >
                <Icon name="instagram" className="h-5 w-5" />
              </a>

              <a
                href={t.contact.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="opacity-55 hover:opacity-90 transition-opacity"
              >
                <Icon name="facebook" className="h-5 w-5" />
              </a>

              <a
                href={t.contact.airbnb}
                target="_blank"
                rel="noreferrer"
                aria-label="Airbnb"
                className="opacity-55 hover:opacity-90 transition-opacity"
              >
                <Icon name="airbnb" className="h-5 w-5" />
              </a>

              {/* Maps: nincs ikon, ezért szöveges link – de ott van */}
              <a
                href={t.contact.maps}
                target="_blank"
                rel="noreferrer"
                className="text-xs tracking-wide opacity-60 hover:opacity-95 transition-opacity"
              >
                MAPS
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
