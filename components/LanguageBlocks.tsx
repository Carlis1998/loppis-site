import Link from "next/link";
import { site } from "@/content/site";

export function LanguageBlocks() {
  return (
    <section className="bg-white px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <article
          lang="de"
          className="rounded-3xl bg-[color:var(--color-surface-alt)] p-8 md:p-10 ring-1 ring-[color:var(--color-hairline)]"
        >
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)] ring-1 ring-[color:var(--color-hairline)]">
            Deutsch
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[color:var(--color-ink)]">
            {site.german.headline}
          </h2>
          <p className="mt-3 text-[color:var(--color-ink-muted)] leading-relaxed">
            {site.german.body}
          </p>
          <Link
            href="/de"
            hrefLang="de"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-coral)] underline decoration-[color:var(--color-coral)]/30 underline-offset-[5px] transition hover:decoration-[color:var(--color-coral)]"
          >
            Zur deutschen Besucherseite →
          </Link>
        </article>
        <article
          lang="en"
          className="rounded-3xl bg-[color:var(--color-surface-alt)] p-8 md:p-10 ring-1 ring-[color:var(--color-hairline)]"
        >
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-coral)] ring-1 ring-[color:var(--color-hairline)]">
            English
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[color:var(--color-ink)]">
            {site.english.headline}
          </h2>
          <p className="mt-3 text-[color:var(--color-ink-muted)] leading-relaxed">
            {site.english.body}
          </p>
          <Link
            href="/en"
            hrefLang="en"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-coral)] underline decoration-[color:var(--color-coral)]/30 underline-offset-[5px] transition hover:decoration-[color:var(--color-coral)]"
          >
            Visit the English page →
          </Link>
        </article>
      </div>
    </section>
  );
}
