"use client";

import { site } from "@/content/site";
import { trackEvent, Events } from "@/lib/posthog";
import type { HeroVariant } from "@/lib/flags";

interface HeroProps {
  variant: HeroVariant;
}

export function Hero({ variant }: HeroProps) {
  const headline = site.headline[variant];

  return (
    <section className="relative overflow-hidden bg-white px-6 pt-16 pb-20 md:pt-24 md:pb-32">
      {/* soft coral wash behind hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#fff0f3] via-[#fff7f8] to-transparent"
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)] shadow-[var(--shadow-pill)] ring-1 ring-[color:var(--color-hairline)]">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-coral)]"
          />
          {site.address} · {site.nearbyLandmark}
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[color:var(--color-ink)] leading-[1.05]">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-[color:var(--color-ink-muted)] leading-relaxed">
          {site.subheadline}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-coral)] px-8 py-4 text-base font-semibold text-white shadow-[var(--shadow-pill)] transition-all hover:bg-[color:var(--color-coral-hover)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,56,92,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)] focus-visible:ring-offset-2"
            onClick={() =>
              trackEvent(Events.HERO_CTA_CLICK, {
                label: site.primaryCTA,
                hero_variant: variant,
              })
            }
          >
            {site.primaryCTA}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
          <a
            href="#visit"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-ink)]/30 decoration-2 underline-offset-[6px] transition hover:decoration-[color:var(--color-coral)] hover:text-[color:var(--color-coral)]"
          >
            Se praktisk info
          </a>
        </div>
      </div>
    </section>
  );
}
