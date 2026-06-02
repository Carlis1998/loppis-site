import { site } from "@/content/site";

export function WhatYoullFind() {
  return (
    <section className="bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)]">
            Sortimentet
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--color-ink)]">
            Vad hittar du hos oss?
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {site.categories.map((cat) => (
            <li
              key={cat}
              className="group relative rounded-2xl border border-[color:var(--color-hairline)] bg-white px-5 py-6 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] hover:border-[color:var(--color-coral)]/30"
            >
              <span className="text-base font-medium text-[color:var(--color-ink)]">
                {cat}
              </span>
              <span
                aria-hidden
                className="mt-3 block h-[3px] w-8 rounded-full bg-[color:var(--color-coral)] mx-auto opacity-70 transition-all group-hover:w-12 group-hover:opacity-100"
              />
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-sm text-[color:var(--color-ink-muted)]">
          Sortimentet skiftar löpande, kom förbi för att se vad som finns idag.
        </p>
      </div>
    </section>
  );
}
