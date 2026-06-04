import Image from "next/image";
import { categories } from "@/content/categories";
import { site } from "@/content/site";
import { withBasePath } from "@/lib/paths";

/**
 * Server-rendered, always-present category catalogue.
 * This is the SEO / screen-reader / no-JS / LLM source of truth.
 * The interactive scene is layered above it; this must remain in the DOM.
 */
export function CategoryFallbackList() {
  return (
    <section
      id="kategorier"
      aria-label="Vad som säljs på loppisen"
      className="mx-auto max-w-5xl px-6 py-20 md:py-24"
    >
      <div
        className="mx-auto mb-5 h-1 w-12 rounded-full bg-[color:var(--color-tag)]"
        aria-hidden
      />
      <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-coral)]">
        Sortiment
      </p>
      <h2 className="mt-3 text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
        Innegårdsloppis i Visby nära Södertorg
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-[color:var(--color-ink-muted)]">
        {site.subheadline}
      </p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {categories.map((c, i) => (
          <li key={c.id} className="group">
            <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-[color:var(--color-surface-warm)] shadow-[var(--shadow-card)] ring-1 ring-[color:var(--color-bark)]/10 transition duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-[var(--shadow-card-hover)]">
              {/* Striped market-stall awning with a scalloped lower edge — turns
                  the card into a stall pitched on the courtyard ground. */}
              <div className="stall-awning relative z-10 h-3 w-full" aria-hidden />
              {c.photos[0] && (
                <div className="relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={withBasePath(c.photos[0].src)}
                      alt={c.photos[0].alt}
                      fill
                      className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, 50vw"
                    />
                  </div>
                  {/* Manila hang-tag, pinned to the stall photo. Tilt alternates per
                      card so the row reads hand-placed, not machine-stamped. */}
                  <span
                    className={`absolute -bottom-3 left-4 inline-flex items-center gap-1.5 rounded-md bg-[color:var(--color-tag)] py-1 pl-2.5 pr-3 text-xs font-semibold text-[color:var(--color-tag-ink)] shadow-[var(--shadow-tag)] ring-1 ring-black/5 ${
                      i % 2 === 0 ? "-rotate-3" : "rotate-2"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-tag-ink)]/40 ring-1 ring-[color:var(--color-tag-ink)]/20"
                    />
                    {c.priceVibe}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6 pt-7">
                <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-[color:var(--color-ink)]">
                  {c.name}
                </h3>
                <p className="mt-2 text-[color:var(--color-ink-muted)] leading-relaxed">
                  {c.blurb}
                </p>
                <p className="mt-3 text-sm text-[color:var(--color-ink)]">
                  <strong className="font-semibold">Det här hittar du:</strong>{" "}
                  <span className="text-[color:var(--color-ink-muted)]">{c.whatYoullFind}</span>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
