import { isLang, DEFAULT_LANG, type Lang } from "@/i18n/languages";

import hu from "@/messages/hu.json";
import ro from "@/messages/ro.json";
import en from "@/messages/en.json";

import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

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

  const socialItems = [
    { href: t.contact.whatsapp, src: "/icons/whatsapp.svg", label: "WhatsApp" },
    { href: t.contact.instagram, src: "/icons/instagram.svg", label: "Instagram" },
    { href: t.contact.facebook, src: "/icons/facebook.svg", label: "Facebook" },
    { href: t.contact.airbnb, src: "/icons/airbnb.svg", label: "Airbnb" },
    { href: t.contact.maps, src: "/icons/maps.svg", label: "Maps" },
  ];

  // 1 tengely mindennek:
  const sectionClass =
    "mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-24 scroll-mt-24";

  return (
    <>
      <main className="w-full">
        <Hero title="AKKERT" motto={t.motto} imageSrc="/hero.jpg" />

        <section id="about" className={sectionClass}>
          <Reveal>
            <h2 className="text-2xl font-medium text-black/90">{t.about.title}</h2>
            <div className="mt-6 space-y-4 text-black/65 max-w-3xl">
              {t.about.text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="gallery" className={sectionClass}>
          <Reveal>
            <h2 className="text-2xl font-medium text-black/90">{t.gallery.title}</h2>
            <div className="mt-8">
              <Gallery images={GALLERY_IMAGES} />
            </div>
          </Reveal>
        </section>

        <section id="contact" className={sectionClass}>
          <Reveal>
            <h2 className="text-2xl font-medium text-black/90">{t.contact.title}</h2>

            <div className="mt-6 space-y-2 text-black/70">
              <p>📞 {t.contact.phone}</p>
              <p>📍 {t.contact.address}</p>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ikonok közvetlenül a footer fölött */}
      <Footer socialItems={socialItems} />
    </>
  );
}
