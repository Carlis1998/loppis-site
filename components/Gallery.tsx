"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { trackEvent, Events } from "@/lib/posthog";
import { withBasePath } from "@/lib/paths";

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (site.gallery.length === 0) return null;

  const open = (i: number) => {
    setLightbox(i);
    trackEvent(Events.GALLERY_INTERACTION, {
      image_id: site.gallery[i].src,
      index: i,
    });
  };

  const close = () => setLightbox(null);

  const prev = () =>
    setLightbox((i) =>
      i === null ? null : (i - 1 + site.gallery.length) % site.gallery.length,
    );
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % site.gallery.length));

  return (
    <section className="bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)]">
            Bilder från innegården
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--color-ink)]">
            Så ser det ut hos oss
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(140px,_1fr)] md:auto-rows-[minmax(180px,_1fr)]">
          {site.gallery.map((img, i) => (
            <button
              key={img.src}
              onClick={() => open(i)}
              className={`group relative overflow-hidden rounded-2xl bg-[color:var(--color-surface-alt)] shadow-[var(--shadow-card)] ring-1 ring-black/5 transition-all hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)] focus-visible:ring-offset-2 ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
              aria-label={`Öppna bild: ${img.alt}`}
            >
              <Image
                src={withBasePath(img.src)}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                priority={i === 0}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#222]/92 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl">
              <Image
                src={withBasePath(site.gallery[lightbox].src)}
                alt={site.gallery[lightbox].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/75">
              {site.gallery[lightbox].alt}
            </p>
            <button
              onClick={close}
              className="absolute -top-2 right-0 flex h-10 w-10 -translate-y-10 items-center justify-center rounded-full bg-white text-xl text-[color:var(--color-ink)] shadow-md transition hover:scale-105"
              aria-label="Stäng"
            >
              ✕
            </button>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 hidden h-12 w-12 -translate-x-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-[color:var(--color-ink)] shadow-md transition hover:scale-105 md:flex"
              aria-label="Föregående"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 hidden h-12 w-12 -translate-y-1/2 translate-x-16 items-center justify-center rounded-full bg-white text-2xl text-[color:var(--color-ink)] shadow-md transition hover:scale-105 md:flex"
              aria-label="Nästa"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
