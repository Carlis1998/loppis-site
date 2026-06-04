# Asset Brief — "One Continuous World" redesign

**For:** an image-generation AI (Midjourney / DALL·E / Firefly / SDXL / Nano-Banana, etc.)
**Project:** innegardsloppis.se — a flea-market ("loppis") landing page in Visby, Gotland.
**Goal of the redesign:** the whole page below the interactive courtyard scene becomes *one continuous place* — a warm parchment "ground" that the market stalls, a pinned notice-board, and a chalkboard FAQ all sit on, instead of separate white brochure sections.

---

## ⚠️ READ THIS FIRST — what is and isn't needed

**The site works with NO new assets.** Everything below is built in CSS/SVG already:
the continuous ground gradient, paper grain, hang-tag strings, pins, tape, the awning
stripes, the chalkboard tint. So treat this brief as **optional richness**, not a blocker.

These texture tiles, *if* you generate them, get dropped into `public/textures/` and the
code switches from the CSS fallback to the real texture automatically (via a CSS token).

**Three hard rules for every asset (these protect Google ranking):**
1. **No text, no logos, no recognisable objects** — these are *background textures only*.
   Anything that should be readable lives in real HTML, never baked into a pixel.
2. **Tiny files.** Each tile must be **under the listed KB budget**. Big background images
   slow "Largest Contentful Paint," which is a Google ranking signal. Compress hard.
3. **Seamless / tileable** where stated — the image must repeat edge-to-edge with no visible seam.

---

## The assets (all optional, ranked by impact)

### 1. Paper grain — `public/textures/paper-grain.png`  ★ highest impact
A subtle warm paper/parchment grain that overlays the entire continuous ground.

- **Dimensions:** 512 × 512 px, **must tile seamlessly** (4-way repeat).
- **Format:** PNG-8 or PNG-24, or WebP. **Budget: ≤ 20 KB.**
- **Look:** very low-contrast cream paper fibre. Think the inside of a kraft envelope or
  hand-made parchment. Almost flat — it should *suggest* texture, never shout. Mostly mid
  warm-cream (`#fbf3e3`-ish) with the faintest darker flecks.
- **Transparency:** opaque is fine (code controls opacity); a transparent grain-only PNG is even better.
- **Prompt:**
  > seamless tileable subtle paper texture, warm cream parchment, very low contrast,
  > fine paper fibre grain, flat even lighting, no shadows, no objects, no text,
  > muted beige #fbf3e3, photographic, high detail, repeating pattern, 512x512
- **Acceptance:** lay 4 copies in a 2×2 grid — no visible seam, no obvious repeating "blob."

### 2. Wood notice-board — `public/textures/wood-board.webp`  ★ medium impact
The surface of the "Besök oss" (Visit info) panel — a wooden notice-board on a courtyard wall.

- **Dimensions:** 1000 × 700 px (does **not** need to tile; used as one panel).
- **Format:** WebP (or compressed JPG). **Budget: ≤ 60 KB.**
- **Look:** weathered warm pine / driftwood planks, soft natural light, gentle vertical grain,
  Scandinavian and aged but clean — like a Gotland courtyard fence board. Warm bark tones
  (`#3a2a18` shadows, `#5b4631` mids). Even lighting, no strong highlights, no hardware.
- **Transparency:** none.
- **Prompt:**
  > weathered warm pine wooden planks, soft Scandinavian daylight, gentle vertical wood grain,
  > aged driftwood, warm brown tones, flat even lighting, no objects, no text, no nails,
  > rustic courtyard notice board surface, photographic, 1000x700
- **Acceptance:** reads as wood at a glance, but quiet enough that white text sits comfortably on top.

### 3. Chalkboard — `public/textures/chalkboard.webp`  ★ lower impact
The surface behind the FAQ ("Vanliga frågor"), styled as a café chalkboard.

- **Dimensions:** 1200 × 800 px (does **not** need to tile).
- **Format:** WebP. **Budget: ≤ 50 KB.**
- **Look:** deep dark green-black slate chalkboard, faint chalk dust haze, very subtle,
  no writing, no frame. Even, slightly cloudy. Base around `#1f2933` → `#1b2530`.
- **Transparency:** none.
- **Prompt:**
  > dark slate chalkboard surface, deep green-black, faint chalk dust haze, even matte finish,
  > no writing, no text, no frame, no objects, soft cloudy texture, photographic, 1200x800
- **Acceptance:** light/cream text is clearly legible on top; no distracting bright spots.

### 4. (Optional) Cobblestone ground strip — `public/textures/cobble.webp`
Only if you want the stall row to sit on visible Visby cobblestones instead of plain parchment.

- **Dimensions:** 1200 × 400 px, **tileable left-to-right** (horizontal repeat).
- **Format:** WebP. **Budget: ≤ 50 KB.**
- **Look:** soft-focus warm grey Visby cobblestones, top-down-ish, muted, low contrast so stalls pop.
- **Prompt:**
  > seamless horizontally tileable old town cobblestone street, warm grey stones, soft focus,
  > muted low contrast, even daylight, no objects, no people, no text, top down, photographic, 1200x400

---

## Stall photos (you likely already have these)

The catalogue "stalls" reuse the existing category photos referenced in `content/categories.ts`
(`c.photos[0].src`). **No new photos are required.** If you *want* to refresh them, match:
warm natural daylight, real second-hand goods (furniture, books, vinyl, clothes, ceramics),
shot square-ish, 800 × 600 px, WebP, ≤ 80 KB each. Decorative framing only — the product
*names* live in HTML text, so the photo never needs to contain readable words.

---

## Where files go & what happens next

1. Drop finished files into `public/textures/` using the **exact filenames above**.
2. Tell me they're in, and I'll flip the CSS tokens from the drawn fallback to the real texture.
3. If a file is missing, the site silently keeps the CSS version — nothing breaks.

## SEO / indexability note (why the rules above exist)

- These are **CSS `background-image` textures**, never `<img>` tags → they carry no `alt`,
  add no content, and are invisible to crawlers (correct — they're decoration).
- All meaningful content (category names, address, opening hours, FAQ Q&A) stays as real,
  selectable, crawlable HTML. Google and AI answer-engines read the text, not the texture.
- Keeping every file under its KB budget protects Largest Contentful Paint — a live Core Web
  Vitals ranking factor. A pretty-but-heavy background would *lower* your search ranking.
