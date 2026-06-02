import { site } from "@/content/site";

export function FAQ() {
  return (
    <section className="bg-[color:var(--color-surface-alt)] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)]">
            Frågor &amp; svar
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--color-ink)]">
            Vanliga frågor
          </h2>
        </div>
        <div className="space-y-3">
          {site.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl bg-white px-6 py-5 shadow-[var(--shadow-card)] ring-1 ring-[color:var(--color-hairline)] open:ring-[color:var(--color-coral)]/30 transition"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[color:var(--color-ink)] marker:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)] font-bold transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[color:var(--color-ink-muted)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
