"use client";

import { site } from "@/content/site";
import { trackEvent, Events } from "@/lib/posthog";

export function VisitInfo() {
  return (
    <section id="visit" className="px-6 py-20 md:py-24">
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

        {/* Right: the info panel as a parchment notice taped to the courtyard
            wall — tilted a hair, with two strips of masking tape. */}
        <div className="relative -rotate-1 rounded-2xl bg-[color:var(--color-parchment)] p-7 md:p-9 shadow-[var(--shadow-card-hover)] ring-1 ring-[color:var(--color-bark)]/10">
          <span
            aria-hidden
            className="absolute -top-3 left-7 h-6 w-20 -rotate-6 rounded-[2px] bg-[color:var(--color-tape)]/75 shadow-sm ring-1 ring-[color:var(--color-bark)]/5"
          />
          <span
            aria-hidden
            className="absolute -top-3 right-7 h-6 w-20 rotate-6 rounded-[2px] bg-[color:var(--color-tape)]/75 shadow-sm ring-1 ring-[color:var(--color-bark)]/5"
          />
          <div className="flex gap-4">
            <span
              aria-hidden
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 21s6.5-5.8 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.2 12 21 12 21Z" />
                <circle cx="12" cy="10.5" r="2.4" />
              </svg>
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
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="3.6" />
                <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
              </svg>
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
            className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-coral)] px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-pill)] transition-all hover:bg-[color:var(--color-coral-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-coral-lift)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)] focus-visible:ring-offset-2 sm:w-auto"
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
