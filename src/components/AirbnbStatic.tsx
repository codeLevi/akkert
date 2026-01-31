"use client";

import dynamic from "next/dynamic";

const AirbnbEmbed = dynamic(() => import("@/components/AirbnbEmbed"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border bg-white/60 p-4 text-sm text-black/60 backdrop-blur">
      Loading…
    </div>
  ),
});

export default function AirbnbStatic() {
  return <AirbnbEmbed listingId="1489020466031401643" width={360} height={240} hidePrice />;
}
