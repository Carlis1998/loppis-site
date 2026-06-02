import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import { site } from "@/content/site";
import { categories } from "@/content/categories";
import { withBasePath } from "@/lib/paths";
import { hreflangAlternates } from "@/content/locales";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seoTitle,
  description: site.seoDescription,
  metadataBase: new URL(site.siteUrl),
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    type: "website",
    locale: "sv_SE",
    siteName: site.siteName,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: hreflangAlternates,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  name: site.siteName,
  description: site.seoDescription,
  url: site.siteUrl,
  image: `${site.siteUrl}/images/courtyard-lights.jpg`,
  hasMap: site.mapUrl,
  slogan: site.subheadline,
  knowsLanguage: ["sv", "en", "de"],
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
  areaServed: {
    "@type": "City",
    name: site.city,
  },
  makesOffer: site.categories.map((category) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Thing",
      name: category,
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: site.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={figtree.variable}>
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          title={`${site.siteName} Markdown`}
          href={withBasePath("/index.html.md")}
        />
        <link
          rel="describedby"
          type="text/plain"
          title="LLM summary"
          href={withBasePath("/llms.txt")}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLd,
              faqJsonLd,
              websiteJsonLd,
              offerCatalogJsonLd,
            ]),
          }}
        />
      </head>
      <body className="font-sans bg-white text-[color:var(--color-ink)]">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
