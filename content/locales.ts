// Central i18n dictionary.
// Powers BOTH the weather-reactive "closed" copy (shown in the interactive scene)
// and the standalone /en and /de visitor info pages. Write each string once.

export type Locale = "sv" | "en" | "de";

export const locales: Locale[] = ["sv", "en", "de"];

/** Human label for the language switcher. */
export const localeNames: Record<Locale, string> = {
  sv: "Svenska",
  en: "English",
  de: "Deutsch",
};

/** BCP-47 tag for <html lang>, Intl formatting and hreflang. */
export const localeTag: Record<Locale, string> = {
  sv: "sv-SE",
  en: "en",
  de: "de",
};

/** URL path for each locale. Swedish is the canonical root. */
export const localePath: Record<Locale, string> = {
  sv: "/",
  en: "/en",
  de: "/de",
};

/**
 * Reciprocal hreflang map for Next `alternates.languages`. Every page links to
 * every locale (including itself) plus an x-default fallback → Swedish root.
 * metadataBase resolves these relative paths to absolute URLs.
 */
export const hreflangAlternates: Record<string, string> = {
  "sv-SE": localePath.sv,
  en: localePath.en,
  de: localePath.de,
  "x-default": localePath.sv,
};

/** Format an ISO date (yyyy-mm-dd) as a weekday name in the given locale. */
export function formatWeekday(isoDate: string, locale: Locale): string {
  // Parse as local noon to avoid timezone day-shift.
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(localeTag[locale], { weekday: "long" }).format(d);
}

// ---------------------------------------------------------------------------
// Weather-reactive scene copy
// ---------------------------------------------------------------------------

export type WeatherCopy = {
  openBadge: string;
  closedBadge: string;
  closedTitle: string;
  closedLead: string;
  reopen: string;
  /** Given a localized weekday, e.g. "Solen är tillbaka på torsdag — välkommen då!" */
  nextGood: (weekday: string) => string;
  nextGoodUnknown: string;
  packedAway: string;
  previewTag: string;
  toggleHint: string;
  exploreHint: string;
  progress: (seen: number, total: number) => string;
};

export const weatherCopy: Record<Locale, WeatherCopy> = {
  sv: {
    openBadge: "Öppet vid fint väder",
    closedBadge: "Stängt idag",
    closedTitle: "Stängt — det regnar i Visby",
    closedLead:
      "Innegården håller stängt när vädret är dåligt. Sakerna ligger inplastade och torra tills solen är tillbaka.",
    reopen: "Vi öppnar igen vid fint väder under sommarsäsongen.",
    nextGood: (d) => `Solen ser ut att vara tillbaka på ${d} — välkommen då!`,
    nextGoodUnknown: "Kika förbi igen när solen tittar fram.",
    packedAway: "Inplastat och undanställt tills solen är tillbaka. ☂️",
    previewTag: "Förhandsvisning",
    toggleHint: "Tryck tre gånger för att växla väderläge",
    exploreHint: "Tryck på ett föremål för att titta närmare",
    progress: (s, t) => `${s} av ${t} stånd utforskade`,
  },
  en: {
    openBadge: "Open in fair weather",
    closedBadge: "Closed today",
    closedTitle: "Closed — it's raining in Visby",
    closedLead:
      "The courtyard stays shut in bad weather. Everything is wrapped up and kept dry until the sun is back.",
    reopen: "We reopen in fair weather during the summer season.",
    nextGood: (d) => `The sun looks set to return on ${d} — come by then!`,
    nextGoodUnknown: "Check back when the sun comes out.",
    packedAway: "Wrapped up and put away until the sun returns. ☂️",
    previewTag: "Preview",
    toggleHint: "Tap three times to switch weather mode",
    exploreHint: "Tap an object to take a closer look",
    progress: (s, t) => `${s} of ${t} stalls explored`,
  },
  de: {
    openBadge: "Geöffnet bei schönem Wetter",
    closedBadge: "Heute geschlossen",
    closedTitle: "Geschlossen — es regnet in Visby",
    closedLead:
      "Der Innenhof bleibt bei schlechtem Wetter geschlossen. Alles ist eingepackt und bleibt trocken, bis die Sonne zurück ist.",
    reopen: "Wir öffnen wieder bei schönem Wetter in der Sommersaison.",
    nextGood: (d) => `Die Sonne kommt voraussichtlich am ${d} zurück — dann gerne vorbeischauen!`,
    nextGoodUnknown: "Schau wieder vorbei, wenn die Sonne scheint.",
    packedAway: "Eingepackt und verstaut, bis die Sonne zurückkommt. ☂️",
    previewTag: "Vorschau",
    toggleHint: "Dreimal tippen, um den Wettermodus zu wechseln",
    exploreHint: "Tippe auf einen Gegenstand, um ihn näher anzusehen",
    progress: (s, t) => `${s} von ${t} Ständen erkundet`,
  },
};

// ---------------------------------------------------------------------------
// Standalone localized visitor pages (/en, /de) — and the sv source of truth
// ---------------------------------------------------------------------------

export type LandingCategory = { name: string; desc: string };
export type LandingFaq = { q: string; a: string };

export type LandingContent = {
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Page copy */
  badge: string;
  headline: string;
  intro: string;
  visitHeading: string;
  addressLabel: string;
  landmarkLabel: string;
  openingLabel: string;
  openingText: string;
  mapCta: string;
  findHeading: string;
  categories: LandingCategory[];
  whyHeading: string;
  why: string[];
  faqHeading: string;
  faq: LandingFaq[];
  experienceHeading: string;
  experienceText: string;
  experienceCta: string;
};

export const landing: Record<Locale, LandingContent> = {
  sv: {
    metaTitle: "Innegårdsloppis i Visby nära Södertorg | Södra Murgatan 4",
    metaDescription:
      "Sommaröppen innegårdsloppis i Visby nära Södertorg. Böcker, samlarprylar, elektronik och blandade fynd på Södra Murgatan 4.",
    badge: "Besöksinfo",
    headline: "Innegårdsloppis i Visby",
    intro:
      "En sommaröppen loppis på en stor, historisk innergård i centrala Visby — böcker, samlarprylar, elektronik och blandade fynd, alldeles nära Södertorg.",
    visitHeading: "Hitta hit",
    addressLabel: "Adress",
    landmarkLabel: "Landmärke",
    openingLabel: "Öppettider",
    openingText:
      "Vi öppnar vid bra väder under sommarsäsongen. Öppettider uppdateras löpande under säsong.",
    mapCta: "Visa på karta",
    findHeading: "Det här hittar du",
    categories: [
      { name: "Böcker", desc: "Romaner, barnböcker och pocket på svenska och engelska." },
      { name: "Samlar- & Pokémonkort", desc: "Lådor med kort att botanisera i." },
      { name: "Samlarprylar", desc: "Porslin, figuriner, mässing och kuriosa." },
      { name: "Elektronik", desc: "Vintageradio, kablar och tekniska fynd." },
      { name: "Kläder", desc: "Sommarplagg, väskor och accessoarer." },
      { name: "Blandade fynd", desc: "Köksprylar, leksaker och allt däremellan." },
    ],
    whyHeading: "Varför besöka oss",
    why: [
      "Stor historisk innegård i centrala Visby",
      "Nära Södertorg — lätt att hitta till fots",
      "Skiftande sortiment varje dag",
      "Sommarstämning och chansen att göra fynd",
    ],
    faqHeading: "Vanliga frågor",
    faq: [
      { q: "Var ligger loppisen?", a: "På Södra Murgatan 4 i Visby, nära Södertorg." },
      { q: "När är ni öppna?", a: "Vid bra väder under sommarsäsongen. Öppettider uppdateras löpande." },
      { q: "Vad säljer ni?", a: "Böcker, samlarprylar, Pokémon-kort, elektronik och blandade fynd." },
      { q: "Hur vet jag om ni är öppna idag?", a: "Kom förbi om vädret är fint — sidan visar dagens väderläge." },
    ],
    experienceHeading: "Gå in på innegården",
    experienceText:
      "Utforska den illustrerade innegården och tryck dig fram bland stånden.",
    experienceCta: "Öppna den interaktiva loppisen",
  },
  en: {
    metaTitle: "Courtyard Flea Market in Visby near Södertorg | Södra Murgatan 4",
    metaDescription:
      "A summer courtyard flea market in central Visby near Södertorg. Books, collectibles, electronics and mixed finds at Södra Murgatan 4, open in fair weather.",
    badge: "Visitor info",
    headline: "Courtyard Flea Market in Visby",
    intro:
      "A seasonal flea market in a large, historic inner courtyard in central Visby — books, collectibles, electronics and changing finds, right by Södertorg.",
    visitHeading: "Getting here",
    addressLabel: "Address",
    landmarkLabel: "Landmark",
    openingLabel: "Opening hours",
    openingText:
      "We open in fair weather during the summer season. Hours are updated as the season goes — there are no fixed daily hours.",
    mapCta: "Open in Google Maps",
    findHeading: "What you'll find",
    categories: [
      { name: "Books", desc: "Novels, children's books and paperbacks in Swedish and English." },
      { name: "Trading & Pokémon cards", desc: "Boxes of cards to dig through." },
      { name: "Collectibles & curios", desc: "Porcelain, figurines, brass and oddities." },
      { name: "Electronics", desc: "Vintage radios, cables and technical finds." },
      { name: "Clothing", desc: "Summer garments, bags and accessories." },
      { name: "Mixed finds", desc: "Kitchenware, toys and everything in between." },
    ],
    whyHeading: "Why visit",
    why: [
      "A large historic courtyard in central Visby",
      "Near Södertorg — easy to reach on foot",
      "A changing selection every day",
      "Summer atmosphere and the thrill of a good find",
    ],
    faqHeading: "Frequently asked",
    faq: [
      { q: "Where is the flea market?", a: "At Södra Murgatan 4 in Visby, close to Södertorg in the old town." },
      { q: "When are you open?", a: "In fair weather during the summer season. There are no fixed daily hours." },
      { q: "What do you sell?", a: "Books, collectibles, Pokémon cards, electronics and mixed finds." },
      { q: "How do I know if you're open today?", a: "Come by when the weather is nice — the site shows today's live weather status." },
    ],
    experienceHeading: "Step into the courtyard",
    experienceText:
      "Explore the illustrated courtyard and tap your way around the stalls.",
    experienceCta: "Open the interactive flea market",
  },
  de: {
    metaTitle: "Innenhof-Flohmarkt in Visby nahe Södertorg | Södra Murgatan 4",
    metaDescription:
      "Ein sommerlicher Innenhof-Flohmarkt im Zentrum von Visby nahe Södertorg. Bücher, Sammlerstücke, Elektronik und wechselnde Fundstücke in der Södra Murgatan 4, geöffnet bei schönem Wetter.",
    badge: "Besucherinfo",
    headline: "Innenhof-Flohmarkt in Visby",
    intro:
      "Ein saisonaler Flohmarkt in einem großen, historischen Innenhof im Zentrum von Visby — Bücher, Sammlerstücke, Elektronik und wechselnde Fundstücke, direkt am Södertorg.",
    visitHeading: "Anfahrt",
    addressLabel: "Adresse",
    landmarkLabel: "Wahrzeichen",
    openingLabel: "Öffnungszeiten",
    openingText:
      "Wir öffnen bei schönem Wetter in der Sommersaison. Die Zeiten werden laufend aktualisiert — es gibt keine festen täglichen Öffnungszeiten.",
    mapCta: "In Google Maps öffnen",
    findHeading: "Das findest du",
    categories: [
      { name: "Bücher", desc: "Romane, Kinderbücher und Taschenbücher auf Schwedisch und Englisch." },
      { name: "Sammel- & Pokémonkarten", desc: "Kisten voller Karten zum Stöbern." },
      { name: "Sammlerstücke & Kuriositäten", desc: "Porzellan, Figuren, Messing und Kurioses." },
      { name: "Elektronik", desc: "Vintage-Radios, Kabel und technische Fundstücke." },
      { name: "Kleidung", desc: "Sommerkleidung, Taschen und Accessoires." },
      { name: "Gemischte Fundstücke", desc: "Küchenutensilien, Spielzeug und alles dazwischen." },
    ],
    whyHeading: "Warum vorbeikommen",
    why: [
      "Ein großer historischer Innenhof im Zentrum von Visby",
      "Nahe Södertorg — bequem zu Fuß erreichbar",
      "Jeden Tag ein wechselndes Sortiment",
      "Sommerstimmung und die Freude am guten Fund",
    ],
    faqHeading: "Häufige Fragen",
    faq: [
      { q: "Wo ist der Flohmarkt?", a: "In der Södra Murgatan 4 in Visby, nahe dem Södertorg in der Altstadt." },
      { q: "Wann habt ihr geöffnet?", a: "Bei schönem Wetter in der Sommersaison. Es gibt keine festen täglichen Öffnungszeiten." },
      { q: "Was verkauft ihr?", a: "Bücher, Sammlerstücke, Pokémonkarten, Elektronik und gemischte Fundstücke." },
      { q: "Woher weiß ich, ob heute geöffnet ist?", a: "Komm vorbei, wenn das Wetter schön ist — die Seite zeigt den aktuellen Wetterstatus." },
    ],
    experienceHeading: "Tritt in den Innenhof",
    experienceText:
      "Erkunde den illustrierten Innenhof und tippe dich durch die Stände.",
    experienceCta: "Den interaktiven Flohmarkt öffnen",
  },
};
