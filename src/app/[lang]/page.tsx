import Image from "next/image";
import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

import hu from "@/messages/hu.json";
import ro from "@/messages/ro.json";
import en from "@/messages/en.json";

import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";

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

/**
 * Uses optimized images from: /public/gallery/web/
 * Files: 01.jpg ... 18.jpg
 */
const GALLERY_IMAGES: { src: string; alt?: string }[] = [
  { src: "/gallery/web/01.jpg", alt: "AKKERT" },
  { src: "/gallery/web/02.jpg", alt: "AKKERT" },
  { src: "/gallery/web/03.jpg", alt: "AKKERT" },
  { src: "/gallery/web/04.jpg", alt: "AKKERT" },
  { src: "/gallery/web/05.jpg", alt: "AKKERT" },
  { src: "/gallery/web/06.jpg", alt: "AKKERT" },
  { src: "/gallery/web/07.jpg", alt: "AKKERT" },
  { src: "/gallery/web/08.jpg", alt: "AKKERT" },
  { src: "/gallery/web/09.jpg", alt: "AKKERT" },
  { src: "/gallery/web/10.jpg", alt: "AKKERT" },
  { src: "/gallery/web/11.jpg", alt: "AKKERT" },
  { src: "/gallery/web/12.jpg", alt: "AKKERT" },
  { src: "/gallery/web/13.jpg", alt: "AKKERT" },
  { src: "/gallery/web/14.jpg", alt: "AKKERT" },
  { src: "/gallery/web/15.jpg", alt: "AKKERT" },
  { src: "/gallery/web/16.jpg", alt: "AKKERT" },
  { src: "/gallery/web/17.jpg", alt: "AKKERT" },
  { src: "/gallery/web/18.jpg", alt: "AKKERT" },
];

export default function Page({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
  const t = MESSAGES[lang];

  const iconLinks = [
    { href: t.contact.instagram, icon: "/icons/instagram.svg", label: "Instagram" },
    { href: t.contact.facebook, icon: "/icons/facebook.svg", label: "Facebook" },
    { href: t.contact.whatsapp, icon: "/icons/whatsapp.svg", label: "WhatsApp" },
    { href: t.contact.airbnb, icon: "/icons/airbnb.svg", label: "Airbnb" },
    { href: t.contact.maps, icon: "/icons/maps.svg", label: "Maps" },
  ];

  return (
    <main className="w-full">
      {/* HERO */}
      <section id="top" className="relative h-[70vh] min-h-[520px] w-full">
        <Image src="/hero.jpg" alt="AKKERT" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Align hero text with section titles */}
        <div className="relative z-10 mx-auto h-full max-w-5xl px-6 md:px-8">
          <div className="absolute left-0 bottom-24 md:bottom-28 max-w-xl">
            <Reveal delay={60} duration={800}>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#f3f2ee]/80">
                AKKERT
              </h1>
            </Reveal>

            <Reveal delay={140} duration={900}>
              <p className="mt-4 text-lg md:text-xl text-[#e6e4dd]/70">
                {t.motto}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTENT COLUMN */}
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        {/* ABOUT */}
        <section id="about" className="py-24 scroll-mt-32">
          <Reveal>
            <h2 className="text-2xl font-medium text-black/90">{t.about.title}</h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-6 space-y-4 text-black/65">
              {t.about.text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="py-24 scroll-mt-32">
          <Reveal>
            <h2 className="text-2xl font-medium text-black/90">{t.gallery.title}</h2>
          </Reveal>

          <div className="mt-8">
            <Gallery images={GALLERY_IMAGES} />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 scroll-mt-32">
          <Reveal>
            <h2 className="text-2xl font-medium text-black/90">{t.contact.title}</h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-6 space-y-2 text-black/70">
              <p>📞 {t.contact.phone}</p>
              <p>📍 {t.contact.address}</p>
            </div>
          </Reveal>
        </section>

        {/* ICONS (above footer, centered) */}
        <section className="py-10">
          <Reveal>
            <div className="mx-auto flex max-w-md items-center justify-center gap-7">
              {iconLinks.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="group opacity-60 transition-all duration-300 hover:opacity-100 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 25}ms` }}
                >
                  <img src={item.icon} alt="" className="h-5 w-5" loading="lazy" />
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
