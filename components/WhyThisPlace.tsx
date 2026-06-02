import { site } from "@/content/site";

export function WhyThisPlace() {
  return (
    <section className="bg-[color:var(--color-surface-alt)] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)]">
            Varför oss
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--color-ink)]">
            Varför just den här loppisen?
          </h2>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {site.whySpecial.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-[color:var(--color-hairline)]"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)] font-bold"
              >
                ✓
              </span>
              <span className="text-base leading-relaxed text-[color:var(--color-ink)]">
                {reason}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
