import Link from "next/link";
import { site } from "@/content/site";
import { landing, localeTag, localePath, type Locale } from "@/content/locales";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Standalone, fully translated visitor page for /en and /de (and the source of
 * truth for sv). Clean static HTML, what it is, where it is, what you'll find,
 * opening guidance, FAQ, map, that funnels visitors to the interactive Swedish
 * courtyard at "/". One renderer, keyed by locale (DRY).
 */
export function LocalizedInfoPage({ locale }: { locale: Locale }) {
  const t = landing[locale];
  const pageUrl = `${site.siteUrl}${localePath[locale]}`;

  // Per-locale structured data: the business + its FAQ, tagged with this language.
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    name: site.siteName,
    alternateName: ["Innegårdsloppis Visby", "Loppis nära Södertorg"],
    description: t.metaDescription,
    url: pageUrl,
    image: [`${site.siteUrl}/images/courtyard-lights.jpg`],
    inLanguage: localeTag[locale],
    priceRange: "$",
    knowsLanguage: ["sv", "en", "de"],
    hasMap: site.mapUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.lat,
      longitude: site.coordinates.lon,
    },
    areaServed: { "@type": "City", name: site.city },
    makesOffer: t.categories.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Thing", name: c.name },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeTag[locale],
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessJsonLd, faqJsonLd]),
        }}
      />

      {/* Header + language switcher */}
      <header className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-full bg-[color:var(--color-parchment)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-bark)]">
            {t.badge}
          </span>
          <LanguageSwitcher current={locale} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-[color:var(--color-bark)] sm:text-4xl">
            {t.headline}
          </h1>
          <p className="mt-3 text-lg text-[color:var(--color-ink-muted)]">{t.intro}</p>
        </div>
      </header>

      {/* Getting here */}
      <section className="mt-10 rounded-3xl bg-[color:var(--color-parchment)] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[color:var(--color-bark)]">{t.visitHeading}</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-ink-muted)]">
              {t.addressLabel}
            </dt>
            <dd className="mt-1 text-base font-medium text-[color:var(--color-ink)]">
              {site.address}, {site.city}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-ink-muted)]">
              {t.landmarkLabel}
            </dt>
            <dd className="mt-1 text-base font-medium text-[color:var(--color-ink)]">Södertorg</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-ink-muted)]">
              {t.openingLabel}
            </dt>
            <dd className="mt-1 text-base text-[color:var(--color-ink)]">{t.openingText}</dd>
          </div>
        </dl>
        <a
          href={site.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-coral)] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-105"
        >
          📍 {t.mapCta}
        </a>
      </section>

      {/* What you'll find */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-[color:var(--color-bark)]">{t.findHeading}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {t.categories.map((c) => (
            <li
              key={c.name}
              className="rounded-2xl border border-[color:var(--color-hairline)] bg-white p-4"
            >
              <h3 className="font-semibold text-[color:var(--color-ink)]">{c.name}</h3>
              <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">{c.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Why visit */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-[color:var(--color-bark)]">{t.whyHeading}</h2>
        <ul className="mt-4 space-y-2">
          {t.why.map((w) => (
            <li key={w} className="flex items-start gap-2 text-[color:var(--color-ink)]">
              <span aria-hidden className="mt-0.5 text-[color:var(--color-coral)]">
                ✺
              </span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-[color:var(--color-bark)]">{t.faqHeading}</h2>
        <div className="mt-4 space-y-3">
          {t.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[color:var(--color-hairline)] bg-white p-4"
            >
              <summary className="cursor-pointer list-none font-semibold text-[color:var(--color-ink)] marker:hidden">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Funnel to the interactive Swedish courtyard */}
      <section className="mt-12 rounded-3xl bg-[color:var(--color-bark)] p-8 text-center text-[#f7ecd8]">
        <h2 className="text-2xl font-bold">{t.experienceHeading}</h2>
        <p className="mx-auto mt-2 max-w-md text-[#e7d8bd]">{t.experienceText}</p>
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-coral)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-105"
        >
          {t.experienceCta} →
        </Link>
      </section>

      <footer className="mt-12 border-t border-[color:var(--color-hairline)] pt-6 text-center text-sm text-[color:var(--color-ink-muted)]">
        <p>
          <span className="font-semibold text-[color:var(--color-ink)]">Innegårdsloppis</span> ·{" "}
          {site.address}, {site.city}
        </p>
      </footer>
    </main>
  );
}
