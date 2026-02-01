import SocialIcons from "@/components/SocialIcons";

export default function Footer({
  socialItems,
}: {
  socialItems: { href: string; src: string; label: string }[];
}) {
  return (
    <footer className="border-t bg-white/92">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
        {/* ikon sor közvetlenül a footer tetején */}
        <SocialIcons items={socialItems} />

        <div className="mt-5 text-center text-xs text-black/40">
          © 2026 AKKERT
        </div>
      </div>
    </footer>
  );
}
