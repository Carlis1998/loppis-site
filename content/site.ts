const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://innegardsloppis.se";

export const site = {
  siteName: "Innegårdsloppis på Södra Murgatan",
  seoTitle: "Innegårdsloppis i Visby nära Södertorg | Södra Murgatan 4",
  seoDescription:
    "Sommaröppen innegårdsloppis i Visby nära Södertorg. Böcker, samlarprylar, elektronik och blandade fynd på Södra Murgatan 4.",
  ogTitle: "Innegårdsloppis i Visby nära Södertorg",
  ogDescription:
    "Stor innegårdsloppis i centrala Visby. Böcker, samlarprylar, elektronik och blandade fynd på Södra Murgatan 4.",

  // Core identity, these drive SEO, do not change without rebuilding canonical text
  headline: {
    sodertorg: "Loppis nära Södertorg i Visby",
    courtyard: "Stor innegårdsloppis i Visby",
  },
  subheadline:
    "Välkommen till Innegårdsloppis på Södra Murgatan 4, en stor innergård i Visby med böcker, samlarprylar, elektronik och blandade fynd under sommaren.",

  address: "Södra Murgatan 4",
  city: "Visby",
  nearbyLandmark: "nära Södertorg",
  coordinates: { lat: 57.6426, lon: 18.2948 },

  openingLogic:
    "Öppettider uppdateras löpande under säsong. Vid fint väder är innegården ofta öppen.",
  openingDescription:
    "Vi öppnar vid bra väder under sommarsäsongen. Öppettider uppdateras löpande under säsong.",

  primaryCTA: "Hitta hit",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Södra+Murgatan+4+Visby",

  siteUrl,

  categories: [
    "Böcker",
    "Samlarprylar",
    "Pokémon-kort",
    "Elektronik",
    "Blandade fynd",
  ],

  whySpecial: [
    "Stor historisk innegård i centrala Visby",
    "Nära Södertorg, lätt att hitta till fots",
    "Skiftande sortiment varje dag",
    "Sommarstämning och chansen att göra fynd",
  ],

  gallery: [
    {
      src: "/images/courtyard-lights.jpg",
      alt: "Innegården på kvällen med lyktor och stämningsfull belysning",
    },
    {
      src: "/images/display-table.jpg",
      alt: "Bord med prylar och fynd ute i innegården",
    },
    {
      src: "/images/books-table.jpg",
      alt: "Böcker arrangerade på bord i trädgårdsmiljö",
    },
    {
      src: "/images/pokemon-cards.jpg",
      alt: "Pokémon-kort i genomskinlig plastlåda, samlarprylar",
    },
    {
      src: "/images/clothing-rack.jpg",
      alt: "Klädstång med olika plagg i sommarmiljö",
    },
    {
      src: "/images/people-table.jpg",
      alt: "Besökare vid bord med prylar i innegården",
    },
    {
      src: "/images/loppis-items.jpg",
      alt: "Blandade loppisfynd på bord i trädgårdsmiljö",
    },
    {
      src: "/images/sunny-table.jpg",
      alt: "Solig sommardag med bord och dryck i innegården",
    },
    {
      src: "/images/items-table.jpg",
      alt: "Prylar och föremål upplagda på bord",
    },
    {
      src: "/images/street-sign.jpg",
      alt: "Skylt som pekar in mot innegården på Södra Murgatan",
    },
    {
      src: "/images/people-garden.jpg",
      alt: "Besökare och säljare i sommarens innegård",
    },
    {
      src: "/images/umbrella-garden.jpg",
      alt: "Person med parasoll bland träd och bord i innegården",
    },
    {
      src: "/images/woman-garden.jpg",
      alt: "Sommarstämning i innegården på Södra Murgatan 4",
    },
  ] as { src: string; alt: string }[],

  faq: [
    {
      q: "Var ligger loppisen?",
      a: "Vi finns på Södra Murgatan 4 i Visby, nära Södertorg i centrala Visby.",
    },
    {
      q: "Ligger ni nära Södertorg?",
      a: "Ja, vi ligger alldeles nära Södertorg i centrala Visby, lätt att hitta till fots.",
    },
    {
      q: "Vad säljer ni?",
      a: "Böcker, samlarprylar, Pokémon-kort, elektronik och blandade fynd. Sortimentet skiftar löpande.",
    },
    {
      q: "När är ni öppna?",
      a: "Vi håller öppet vid bra väder under sommarsäsongen. Öppettider uppdateras löpande under säsong.",
    },
    {
      q: "Hur vet jag om ni är öppna idag?",
      a: "Kom förbi om vädret är fint, öppettider uppdateras löpande under säsong.",
    },
    {
      q: "Kan jag hitta böcker och samlarprylar?",
      a: "Ja, böcker och samlarprylar är en del av det fasta utbudet. Vi har även elektronik och mer.",
    },
  ],

  german: {
    headline: "Flohmarkt im Innenhof in Visby",
    body: "Flohmarkt im historischen Innenhof in der Nähe des Södertorg in Visby. Bücher, Sammlerstücke, Elektronik und wechselnde Fundstücke im Herzen der Altstadt. Södra Murgatan 4, Visby.",
  },

  english: {
    headline: "Courtyard Flea Market in Visby",
    body: "A seasonal courtyard flea market near Södertorg in central Visby. Books, collectibles, electronics, and changing finds in a historic inner courtyard. Södra Murgatan 4, Visby.",
  },
} as const;
