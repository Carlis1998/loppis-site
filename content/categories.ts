export type Coord = { x: number; y: number; scale: number };

export type Category = {
  id: string;
  name: string;
  blurb: string;
  whatYoullFind: string;
  priceVibe: string;
  availability: string;
  /** asset slot id; resolves to /scene/objects/<key>.png, placeholder until provided */
  objectAsset: string;
  photos: { src: string; alt: string }[];
  coords: { landscape: Coord; portrait: Coord };
};

const ÖPPET = "Öppet vid fint väder under sommarsäsongen.";

export const categories: Category[] = [
  {
    id: "bocker",
    name: "Böcker",
    blurb:
      "Bord fulla med begagnade böcker, romaner, barnböcker och oväntade pärlor på svenska och engelska.",
    whatYoullFind:
      "Romaner, barnböcker, fackböcker och pocket, på svenska och engelska.",
    priceVibe: "Fynd från 10 kr",
    availability: ÖPPET,
    objectAsset: "object-bocker",
    photos: [
      { src: "/images/books-table.jpg", alt: "Böcker arrangerade på bord i innegården" },
    ],
    coords: { landscape: { x: 20, y: 78, scale: 1 }, portrait: { x: 42, y: 54, scale: 0.92 } },
  },
  {
    id: "kort",
    name: "Pokémon- & samlarkort",
    blurb:
      "En låda med blandade kort att botanisera i, för både nybörjare och samlare.",
    whatYoullFind: "Pokémon-kort och andra samlarkort, blandade lådor att gräva i.",
    priceVibe: "Från någon krona styck",
    availability: ÖPPET,
    objectAsset: "object-kort",
    photos: [
      { src: "/images/pokemon-cards.jpg", alt: "Pokémon-kort i genomskinlig plastlåda" },
    ],
    coords: { landscape: { x: 49, y: 75, scale: 0.9 }, portrait: { x: 66, y: 44, scale: 0.62 } },
  },
  {
    id: "samlarprylar",
    name: "Samlarprylar",
    blurb: "Porslin, prydnader och kuriosa, små skatter med historia.",
    whatYoullFind: "Porslin, figuriner, mässing och annan kuriosa.",
    priceVibe: "Blandade priser",
    availability: ÖPPET,
    objectAsset: "object-samlarprylar",
    photos: [
      { src: "/images/items-table.jpg", alt: "Prylar och föremål upplagda på bord" },
    ],
    coords: { landscape: { x: 63, y: 57, scale: 0.7 }, portrait: { x: 27, y: 66, scale: 0.72 } },
  },
  {
    id: "elektronik",
    name: "Elektronik & prylar",
    blurb: "Vintage-elektronik, kablar och manicker som letar nytt hem.",
    whatYoullFind: "Radio, kablar, småelektronik och tekniska fynd.",
    priceVibe: "Fynd från 20 kr",
    availability: ÖPPET,
    objectAsset: "object-elektronik",
    photos: [
      { src: "/images/display-table.jpg", alt: "Bord med prylar och fynd i innegården" },
    ],
    coords: { landscape: { x: 85, y: 82, scale: 0.9 }, portrait: { x: 72, y: 67, scale: 0.82 } },
  },
  {
    id: "klader",
    name: "Kläder & accessoarer",
    blurb: "En klädstång med sommarplagg, väskor och smått att haka på.",
    whatYoullFind: "Sommarplagg, väskor, hattar och accessoarer.",
    priceVibe: "Plagg från 20 kr",
    availability: ÖPPET,
    objectAsset: "object-klader",
    photos: [
      { src: "/images/clothing-rack.jpg", alt: "Klädstång med olika plagg i sommarmiljö" },
    ],
    coords: { landscape: { x: 40, y: 61, scale: 0.85 }, portrait: { x: 34, y: 80, scale: 0.85 } },
  },
  {
    id: "blandat",
    name: "Blandade fynd",
    blurb:
      "Allt möjligt, kom och gräv i lådorna, sortimentet skiftar varje dag.",
    whatYoullFind: "Köksprylar, leksaker, tavlor och allt däremellan.",
    priceVibe: "Allt möjligt, ofta en tia",
    availability: ÖPPET,
    objectAsset: "object-blandat",
    photos: [
      { src: "/images/loppis-items.jpg", alt: "Blandade loppisfynd på bord i innegården" },
    ],
    coords: { landscape: { x: 60, y: 72, scale: 0.85 }, portrait: { x: 58, y: 81, scale: 0.85 } },
  },
];
