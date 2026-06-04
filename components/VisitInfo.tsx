"use client";

import { site } from "@/content/site";
import { trackEvent, Events } from "@/lib/posthog";

export function VisitInfo() {
  return (
    <section
      id="visit"
      className="bg-[color:var(--color-surface-alt)] px-6 py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        {/* Left: heading block, left-aligned to break the page's centered rhythm. */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)]">
            Besök oss
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--color-ink)]">
            Praktisk information
          </h2>
          <div className="mt-4 h-px w-12 bg-[color:var(--color-coral)]/40" aria-hidden />
          <p className="mt-4 max-w-xs text-[color:var(--color-ink-muted)] leading-relaxed">
            Mitt i Visby innerstad, ett stenkast från Södertorg.
          </p>
        </div>

        {/* Right: the info panel itself. */}
        <div className="rounded-3xl bg-[color:var(--color-surface-warm)] p-7 md:p-9 shadow-[var(--shadow-card)] ring-1 ring-[color:var(--color-hairline)]">
          <div className="flex gap-4">
            <span
              aria-hidden
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)] text-lg"
            >
              ◎
            </span>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ink-muted)]">
                Adress
              </h3>
              <p className="mt-1.5 text-lg font-semibold text-[color:var(--color-ink)]">
                {site.address}, {site.city}
              </p>
              <p className="text-sm text-[color:var(--color-ink-muted)]">
                {site.nearbyLandmark}
              </p>
            </div>
          </div>

          <div className="my-6 h-px bg-[color:var(--color-hairline)]" aria-hidden />

          <div className="flex gap-4">
            <span
              aria-hidden
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)] text-lg"
            >
              ☀
            </span>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ink-muted)]">
                Öppettider
              </h3>
              <p className="mt-1.5 text-base text-[color:var(--color-ink)] leading-relaxed">
                {site.openingDescription}
              </p>
            </div>
          </div>

          <a
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-coral)] px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-pill)] transition-all hover:bg-[color:var(--color-coral-hover)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(223,84,64,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)] focus-visible:ring-offset-2 sm:w-auto"
            onClick={() =>
              trackEvent(Events.MAP_CLICK, { location: "practical_info" })
            }
          >
            Visa på karta
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
