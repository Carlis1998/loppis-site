import { CourtyardScene } from "@/components/scene/CourtyardScene";
import { IntroSplash } from "@/components/scene/IntroSplash";
import { AmbientAudio } from "@/components/scene/AmbientAudio";
import { CategoryFallbackList } from "@/components/CategoryFallbackList";
import { WeatherBanner } from "@/components/WeatherBanner";
import { WeatherModuleTracker } from "@/components/WeatherModuleTracker";
import { VisitInfo } from "@/components/VisitInfo";
import { LanguageBlocks } from "@/components/LanguageBlocks";
import { FAQ } from "@/components/FAQ";
import { ScrollTracker } from "@/components/ScrollTracker";
import { getWeatherStatus } from "@/lib/weather";
import { providedSlots } from "@/lib/provided-assets";
import { site } from "@/content/site";
import { categories } from "@/content/categories";

// Swedish (canonical) structured data. Lives on the root page, not the shared
// layout, so /en and /de carry only their own locale's JSON-LD.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  name: site.siteName,
  description: site.seoDescription,
  url: site.siteUrl,
  image: `${site.siteUrl}/images/courtyard-lights.jpg`,
  hasMap: site.mapUrl,
  slogan: site.subheadline,
  knowsLanguage: ["sv", "en", "de"],
  inLanguage: "sv-SE",
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
  makesOffer: site.categories.map((category) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Thing", name: category },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "sv-SE",
  mainEntity: site.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const offerCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Sortiment på Innegårdsloppis",
  itemListElement: categories.map((c) => ({
    "@type": "OfferCatalog",
    name: c.name,
    description: c.whatYoullFind,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.siteName,
  url: site.siteUrl,
  inLanguage: "sv-SE",
  description: site.seoDescription,
};

export default async function HomePage() {
  const weather = await getWeatherStatus();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessJsonLd,
            faqJsonLd,
            websiteJsonLd,
            offerCatalogJsonLd,
          ]),
        }}
      />
      <IntroSplash />
      <WeatherBanner weather={weather} />
      <WeatherModuleTracker weatherStatus={weather.status} />
      <CourtyardScene
        providedSlots={providedSlots}
        weather={{
          isGoodWeather: weather.isGoodWeather,
          status: weather.status,
          nextGoodDate: weather.nextGoodDate,
        }}
      />
      <CategoryFallbackList />
      <VisitInfo />
      <LanguageBlocks />
      <FAQ />
      <footer className="border-t border-[color:var(--color-hairline)] bg-white px-6 py-10 text-center text-sm text-[color:var(--color-ink-muted)]">
        <p className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <span className="font-semibold text-[color:var(--color-ink)]">
            Innegårdsloppis
          </span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>Södra Murgatan 4, Visby</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Södra+Murgatan+4+Visby"
            className="font-medium text-[color:var(--color-coral)] underline decoration-[color:var(--color-coral)]/30 underline-offset-[5px] transition hover:decoration-[color:var(--color-coral)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visa på karta
          </a>
        </p>
      </footer>
      <AmbientAudio />
      <ScrollTracker />
    </main>
  );
}
