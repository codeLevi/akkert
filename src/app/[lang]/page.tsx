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
};

const MESSAGES: Record<Lang, MessagesShape> = { hu, ro, en };

// 🔧 18 kép (01.jpg ... 18.jpg) a /public/gallery/ mappában
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
          className="object-cover"
          sizes="100vw"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* text */}
        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-8">
          <div className="absolute left-6 md:left-8 bottom-24 md:bottom-28 max-w-xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#f3f2ee]/80">
              AKKERT
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#e6e4dd]/70">
              {t.motto}
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-5xl px-6 py-24 md:px-8 scroll-mt-32
                   [content-visibility:auto] [contain-intrinsic-size:1px_700px]"
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
                   [content-visibility:auto] [contain-intrinsic-size:1px_900px]"
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
                   [content-visibility:auto] [contain-intrinsic-size:1px_650px]"
      >
        <Reveal>
          <h2 className="text-2xl font-medium text-black/90">
            {t.contact.title}
          </h2>

          {/* phone + address (ikonok maradjanak előlük) */}
          <div className="mt-6 space-y-3 text-black/70">
            <div className="flex items-center gap-3">
              <span className="opacity-70">
                <Icon name="phone" size={18} />
              </span>
              <a
                href={`tel:${t.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-black/90 transition-colors"
              >
                {t.contact.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="opacity-70">
                <Icon name="pin" size={18} />
              </span>
              <span>{t.contact.address}</span>
            </div>
          </div>

          {/* bottom icons row */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-8 text-black/70">
              <a
                href={t.contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="opacity-70 hover:opacity-95 transition-opacity"
              >
                <Icon name="instagram" size={22} />
              </a>

              <a
                href={t.contact.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="opacity-70 hover:opacity-95 transition-opacity"
              >
                <Icon name="facebook" size={22} />
              </a>

              <a
                href={t.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="opacity-70 hover:opacity-95 transition-opacity"
              >
                <Icon name="whatsapp" size={22} />
              </a>

              <a
                href={t.contact.airbnb}
                target="_blank"
                rel="noreferrer"
                aria-label="Airbnb"
                className="opacity-70 hover:opacity-95 transition-opacity"
              >
                <Icon name="airbnb" size={22} />
              </a>

              <a
                href={t.contact.maps}
                target="_blank"
                rel="noreferrer"
                aria-label="Maps"
                className="opacity-70 hover:opacity-95 transition-opacity"
              >
                <Icon name="maps" size={22} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
