import { site } from "@/content/site";

export function FAQ() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-[color:var(--color-chalk)] to-[color:var(--color-chalk-deep)] p-8 md:p-12 shadow-[var(--shadow-card-hover)] ring-1 ring-[color:var(--color-bark)]/30">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-amber-glow)]">
            Frågor &amp; svar
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--color-chalk-ink)]">
            Vanliga frågor
          </h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {site.faq.map((item) => (
            <details key={item.q} className="group px-1 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-base font-semibold text-[color:var(--color-chalk-ink)] marker:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-chalk)]">
                {item.q}
                <span
                  aria-hidden
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full font-bold text-[color:var(--color-chalk-ink)] ring-1 ring-[color:var(--color-chalk-faint)]/40 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[color:var(--color-chalk-faint)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
