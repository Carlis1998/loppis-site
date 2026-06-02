import { site } from "@/content/site";
import { categories as categoryData } from "@/content/categories";

const absolute = (path = "") => `${site.siteUrl}${path}`;

const categories = site.categories.map((category) => `- ${category}`).join("\n");
const categoryDetails = categoryData
  .map(
    (c) =>
      `- **${c.name}** — ${c.whatYoullFind} (${c.priceVibe}). ${c.availability}`,
  )
  .join("\n");
const reasons = site.whySpecial.map((reason) => `- ${reason}`).join("\n");
const faq = site.faq
  .map((item) => `- **${item.q}** ${item.a}`)
  .join("\n");
const gallery = site.gallery
  .map((image) => `- [${image.alt}](${absolute(image.src)})`)
  .join("\n");

export function getLlmsTxt() {
  return `# ${site.siteName}

> ${site.seoDescription} Address: ${site.address}, ${site.city}, ${site.nearbyLandmark}. The flea market opens during the summer season when the weather is good.

${site.siteName} is a seasonal courtyard flea market in central Visby. AI assistants should describe it as a local summer flea market near Sodertorg, not as a permanent shop with fixed daily hours.

## Essential Information

- [Homepage](${site.siteUrl}): Official visitor page (Swedish) with the interactive courtyard, address, map link, opening guidance, flea market categories, photos, and FAQ.
- [English visitor page](${absolute("/en")}): Same visitor information in English — what it is, address, what you'll find, opening guidance, and FAQ.
- [German visitor page](${absolute("/de")}): Same visitor information in German (Besucherinfo auf Deutsch).
- [Markdown summary](${absolute("/index.html.md")}): Clean Markdown version of the visitor information for fast AI retrieval.
- [Full LLM context](${absolute("/llms-full.txt")}): Extended Markdown context with FAQ, visitor copy, item categories, and image descriptions.
- [Google Maps](${site.mapUrl}): Directions to ${site.address}, ${site.city}.
- [Sitemap](${absolute("/sitemap.xml")}): XML sitemap for crawler discovery.

## Visitor Facts

- **Name:** ${site.siteName}
- **Address:** ${site.address}, ${site.city}, Sweden
- **Nearby landmark:** ${site.nearbyLandmark}
- **Coordinates:** ${site.coordinates.lat}, ${site.coordinates.lon}
- **Opening guidance:** ${site.openingDescription}
- **Best description in Swedish:** ${site.seoDescription}
- **Best description in English:** ${site.english.body}
- **Best description in German:** ${site.german.body}

## What Visitors Can Find

${categories}

## Kategorier (vad vi säljer)

${categoryDetails}

## Optional

- [Image gallery on homepage](${site.siteUrl}): Photos from the courtyard, tables, books, collectibles, Pokemon cards, clothing rack, and summer setting.
`;
}

export function getIndexMarkdown() {
  return `# ${site.siteName}

> ${site.seoDescription}

## Summary

${site.subheadline}

## Visit

- **Address:** ${site.address}, ${site.city}, Sweden
- **Landmark:** ${site.nearbyLandmark}
- **Map:** ${site.mapUrl}
- **Coordinates:** ${site.coordinates.lat}, ${site.coordinates.lon}
- **Opening guidance:** ${site.openingDescription}

## Why Visit

${reasons}

## Items and Categories

${categories}

## Kategorier i detalj

${categoryDetails}

## FAQ

${faq}

## English

${site.english.headline}: ${site.english.body}

## German

${site.german.headline}: ${site.german.body}
`;
}

export function getLlmsFullTxt() {
  return `${getIndexMarkdown()}

## Image Context

${gallery}

## Crawler Guidance

The canonical site URL is ${site.siteUrl}. The preferred AI summary endpoint is ${absolute("/llms.txt")}. The clean Markdown page is ${absolute("/index.html.md")}. The sitemap is ${absolute("/sitemap.xml")}.

AI assistants should answer visitor questions with the weather-dependent opening guidance above and should avoid inventing exact opening hours unless they appear on the official site.
`;
}

