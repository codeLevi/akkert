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

const GALLERY_IMAGES: { src: string; alt?: string }[] = [
  // ide jönnek a képek, pl:
  // { src: "/gallery/01.jpg", alt: "AKKERT" },
];

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

        {/* stable cinematic overlay (no jitter) */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_25%_55%,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />

        {/* TEXT — left + lower + off-white + faded + reveal */}
        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-8">
          <div className="absolute left-6 md:left-8 bottom-24 md:bottom-28 max-w-xl">
            <Reveal offsetY={8} durationMs={800}>
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
        className="mx-auto max-w-5xl px-6 py-24 md:px-8 scroll-mt-28"
      >
        <Reveal offsetY={10} durationMs={800}>
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
        className="mx-auto max-w-5xl px-6 py-24 md:px-8 scroll-mt-28"
      >
        <h2 className="text-2xl font-medium text-black/90">{t.gallery.title}</h2>

        <div className="mt-8">
          <Gallery images={GALLERY_IMAGES} />
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-5xl px-6 py-24 md:px-8 scroll-mt-28"
      >
        <Reveal offsetY={10} durationMs={800}>
          <h2 className="text-2xl font-medium text-black/90">
            {t.contact.title}
          </h2>

          {/* phone + address icons MUST stay */}
          <div className="mt-6 space-y-3 text-black/70">
            <div className="flex items-center gap-3">
              <span className="opacity-70">📞</span>
              <a
                className="hover:text-black/90 transition"
                href={`tel:${t.contact.phone.replace(/\s+/g, "")}`}
              >
                {t.contact.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="opacity-70">📍</span>
              <a
                className="hover:text-black/90 transition"
                href={t.contact.maps}
                target="_blank"
                rel="noreferrer"
              >
                {t.contact.address}
              </a>
            </div>
          </div>
        </Reveal>

        {/* ICON ROW directly above footer, centered feel via spacing */}
        <div className="mt-10">
          <div className="flex items-center gap-6 text-black/55">
            <a
              href={t.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black/80 transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <Icon name="instagram" className="h-4 w-4" />
            </a>

            <a
              href={t.contact.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black/80 transition"
              aria-label="Facebook"
              title="Facebook"
            >
              <Icon name="facebook" className="h-4 w-4" />
            </a>

            <a
              href={t.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black/80 transition"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
            </a>

            <a
              href={t.contact.airbnb}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black/80 transition"
              aria-label="Airbnb"
              title="Airbnb"
            >
              <Icon name="airbnb" className="h-4 w-4" />
            </a>

            <a
              href={t.contact.maps}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black/80 transition"
              aria-label="Maps"
              title="Maps"
            >
              {/* ha van maps svg, cseréld: Icon name="maps" */}
              <span className="inline-flex h-4 w-4 items-center justify-center text-[12px]">
                ⌁
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
