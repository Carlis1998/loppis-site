"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { withBasePath } from "@/lib/paths";

export function IntroSplash() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#2b1d10] px-6 text-center text-[#f7ecd8]">
      <Image
        src={withBasePath("/scene/intro-splash.png")}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
      <p className="relative text-sm uppercase tracking-[0.2em] text-[#f3d9b0] drop-shadow">
        {site.address} · {site.nearbyLandmark}
      </p>
      <p className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
        Stig in på innegården
      </p>
      <p className="mt-4 max-w-md text-[#e8dcc4]">{site.subheadline}</p>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="mt-8 rounded-full bg-[color:var(--color-coral)] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Gå in på loppisen →
      </button>
    </div>
  );
}
