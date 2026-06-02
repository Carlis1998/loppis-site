import { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, localePath, localeTag } from "@/content/locales";

export const dynamic = "force-static";

// Absolute URL for a locale, e.g. https://innegardsloppis.se/en
const urlFor = (path: string) =>
  path === "/" ? site.siteUrl : `${site.siteUrl}${path}`;

// Shared hreflang alternates block (sv-SE, en, de) reused on every entry.
const languageAlternates = Object.fromEntries(
  locales.map((loc) => [localeTag[loc], urlFor(localePath[loc])]),
) as Record<string, string>;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((loc) => ({
    url: urlFor(localePath[loc]),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: loc === "sv" ? 1 : 0.8,
    alternates: { languages: languageAlternates },
  }));
}
