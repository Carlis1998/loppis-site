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
      "Bord fulla med begagnade böcker — romaner, barnböcker och oväntade pärlor på svenska och engelska.",
    whatYoullFind:
      "Romaner, barnböcker, fackböcker och pocket — på svenska och engelska.",
    priceVibe: "Fynd från 10 kr",
    availability: ÖPPET,
    objectAsset: "object-bocker",
    photos: [
      { src: "/images/books-table.jpg", alt: "Böcker arrangerade på bord i innegården" },
    ],
    coords: { landscape: { x: 22, y: 62, scale: 1 }, portrait: { x: 30, y: 30, scale: 1 } },
  },
  {
    id: "kort",
    name: "Pokémon- & samlarkort",
    blurb:
      "En låda med blandade kort att botanisera i — för både nybörjare och samlare.",
    whatYoullFind: "Pokémon-kort och andra samlarkort, blandade lådor att gräva i.",
    priceVibe: "Från någon krona styck",
    availability: ÖPPET,
    objectAsset: "object-kort",
    photos: [
      { src: "/images/pokemon-cards.jpg", alt: "Pokémon-kort i genomskinlig plastlåda" },
    ],
    coords: { landscape: { x: 44, y: 70, scale: 0.9 }, portrait: { x: 66, y: 42, scale: 0.9 } },
  },
  {
    id: "samlarprylar",
    name: "Samlarprylar",
    blurb: "Porslin, prydnader och kuriosa — små skatter med historia.",
    whatYoullFind: "Porslin, figuriner, mässing och annan kuriosa.",
    priceVibe: "Blandade priser",
    availability: ÖPPET,
    objectAsset: "object-samlarprylar",
    photos: [
      { src: "/images/items-table.jpg", alt: "Prylar och föremål upplagda på bord" },
    ],
    coords: { landscape: { x: 62, y: 58, scale: 0.95 }, portrait: { x: 32, y: 56, scale: 0.95 } },
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
    coords: { landscape: { x: 76, y: 66, scale: 0.9 }, portrait: { x: 68, y: 66, scale: 0.9 } },
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
    coords: { landscape: { x: 34, y: 48, scale: 0.85 }, portrait: { x: 34, y: 80, scale: 0.85 } },
  },
  {
    id: "blandat",
    name: "Blandade fynd",
    blurb:
      "Allt möjligt — kom och gräv i lådorna, sortimentet skiftar varje dag.",
    whatYoullFind: "Köksprylar, leksaker, tavlor och allt däremellan.",
    priceVibe: "Allt möjligt, ofta en tia",
    availability: ÖPPET,
    objectAsset: "object-blandat",
    photos: [
      { src: "/images/loppis-items.jpg", alt: "Blandade loppisfynd på bord i innegården" },
    ],
    coords: { landscape: { x: 54, y: 50, scale: 0.85 }, portrait: { x: 66, y: 80, scale: 0.85 } },
  },
];
