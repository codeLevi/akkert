"use client";

import { useEffect, useMemo, useRef } from "react";

type Props = {
  listingId: string;
  localeBaseUrl?: string; // pl. https://www.airbnb.hu
  width?: number;
  height?: number;
  hidePrice?: boolean;
};

export default function AirbnbEmbed({
  listingId,
  localeBaseUrl = "https://www.airbnb.hu",
  width = 360,
  height = 240,
  hidePrice = true,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const href = useMemo(() => {
    return `${localeBaseUrl}/rooms/${listingId}?guests=1&adults=1&s=66&source=embed_widget`;
  }, [localeBaseUrl, listingId]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    el.innerHTML = "";

    const frame = document.createElement("div");
    frame.className = "airbnb-embed-frame";
    frame.setAttribute("data-id", listingId);
    frame.setAttribute("data-view", "home");
    frame.setAttribute("data-hide-price", hidePrice ? "true" : "false");
    frame.setAttribute("style", `width:${width}px;height:${height}px;margin:auto;`);

    const a1 = document.createElement("a");
    a1.href = href;
    a1.target = "_blank";
    a1.rel = "noreferrer";
    a1.textContent = "Nézd meg az Airbnb-n";

    const a2 = document.createElement("a");
    a2.href = href;
    a2.target = "_blank";
    a2.rel = "nofollow noreferrer";
    a2.textContent = "Víkendház · Kolozsvár";

    frame.appendChild(a1);
    frame.appendChild(a2);
    el.appendChild(frame);

    const s = document.createElement("script");
    s.async = true;
    s.src = `${localeBaseUrl}/embeddable/airbnb_jssdk`;
    el.appendChild(s);
  }, [listingId, localeBaseUrl, href, width, height, hidePrice]);

  return (
    <div className="rounded-2xl border bg-white/70 p-3 shadow-sm backdrop-blur">
      <div ref={mountRef} />
      <div className="mt-3 flex justify-center">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-xs opacity-70 underline underline-offset-4 hover:opacity-100"
        >
          Open in Airbnb
        </a>
      </div>
    </div>
  );
}
