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
      className="mx-auto max-w-5xl px-6 py-16"
    >
      <h1 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
        Innegårdsloppis i Visby nära Södertorg
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-[color:var(--color-ink-muted)]">
        {site.subheadline}
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="rounded-2xl border border-[color:var(--color-hairline)] bg-white p-5 shadow-[var(--shadow-card)]"
          >
            <article>
              <h3 className="text-xl font-semibold">{c.name}</h3>
              <p className="mt-2 text-[color:var(--color-ink-muted)]">{c.blurb}</p>
              <p className="mt-2 text-sm">
                <strong>Det här hittar du:</strong> {c.whatYoullFind}
              </p>
              <p className="mt-1 text-sm text-[color:var(--color-coral)]">{c.priceVibe}</p>
              {c.photos[0] && (
                <div className="relative mt-3 h-40 overflow-hidden rounded-xl">
                  <Image
                    src={withBasePath(c.photos[0].src)}
                    alt={c.photos[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 100vw, 50vw"
                  />
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
