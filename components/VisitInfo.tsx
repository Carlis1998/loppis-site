"use client";

import { site } from "@/content/site";
import { trackEvent, Events } from "@/lib/posthog";

export function VisitInfo() {
  return (
    <section
      id="visit"
      className="bg-[color:var(--color-surface-alt)] px-6 py-20 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)]">
            Besök oss
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--color-ink)]">
            Praktisk information
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-8 md:p-10 shadow-[var(--shadow-card)] ring-1 ring-[color:var(--color-hairline)]">
          <div className="grid gap-8 md:grid-cols-2">
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
          </div>

          <div className="mt-10 border-t border-[color:var(--color-hairline)] pt-8 text-center">
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-coral)] px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-pill)] transition-all hover:bg-[color:var(--color-coral-hover)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,56,92,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)] focus-visible:ring-offset-2"
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
      </div>
    </section>
  );
}
