// Processes assets-to-generate/incoming/*.png into public/scene/*.
// - Objects + ornaments: key out the pure-black background -> transparency,
//   recovering true colours (image was captured additively over black, so
//   object_colour = captured / alpha).
// - Backgrounds + intro splash: full scenes, just resized/optimised.
import sharp from "sharp";
import { join, dirname } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inDir = join(root, "assets-to-generate/incoming");
const pub = join(root, "public");

const KEYED = [
  ["object-bocker.png", "scene/objects/bocker.png"],
  ["object-kort.png", "scene/objects/kort.png"],
  ["object-samlarprylar.png", "scene/objects/samlarprylar.png"],
  ["object-elektronik.png", "scene/objects/elektronik.png"],
  ["object-klader.png", "scene/objects/klader.png"],
  ["object-blandat.png", "scene/objects/blandat.png"],
  ["frame-ornaments.png", "scene/decor/frame-ornaments.png"],
  // rain variants — same composition, rain-protected (plastic / tarp / glass dome)
  ["object-bocker-rain.png", "scene/objects/bocker-rain.png"],
  ["object-kort-rain.png", "scene/objects/kort-rain.png"],
  ["object-samlarprylar-rain.png", "scene/objects/samlarprylar-rain.png"],
  ["object-elektronik-rain.png", "scene/objects/elektronik-rain.png"],
  ["object-klader-rain.png", "scene/objects/klader-rain.png"],
  ["object-blandat-rain.png", "scene/objects/blandat-rain.png"],
  // illustrated weather board (text baked in) — cut out for use as decoration
  ["sign-open.png", "scene/sign-open.png"],
];
const SCENES = [
  ["scene-background-landscape.png", "scene/scene-background-landscape.png", 2048],
  ["scene-background-portrait.png", "scene/scene-background-portrait.png", 1280],
  ["intro-splash.png", "scene/intro-splash.png", 1280],
  // rainy / closed full scenes
  ["scene-background-landscape-rain.png", "scene/scene-background-landscape-rain.png", 2048],
  ["scene-background-portrait-rain.png", "scene/scene-background-portrait-rain.png", 1280],
  ["closed-splash.png", "scene/closed-splash.png", 1280],
];

const T0 = 10; // below this luminance -> fully transparent
const T1 = 55; // above this luminance -> fully opaque

async function keyBlack(src, dst) {
  const img = sharp(src).resize({ width: 1024, withoutEnlargement: true }).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = Math.max(r, g, b);
    let a = (lum - T0) / (T1 - T0);
    a = a < 0 ? 0 : a > 1 ? 1 : a;
    if (a > 0 && a < 1) {
      // un-premultiply: recover colour that black bg darkened
      data[i] = Math.min(255, Math.round(r / a));
      data[i + 1] = Math.min(255, Math.round(g / a));
      data[i + 2] = Math.min(255, Math.round(b / a));
    }
    data[i + 3] = Math.round(a * 255);
  }
  mkdirSync(dirname(dst), { recursive: true });
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(dst);
  console.log("  ✂  keyed   ", dst);
}

async function scene(src, dst, w) {
  mkdirSync(dirname(dst), { recursive: true });
  await sharp(src)
    .flatten({ background: "#000" })
    .resize({ width: w, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(dst);
  console.log("  🖼  scene   ", dst);
}

console.log("\nProcessing incoming assets...\n");
for (const [f, t] of KEYED) await keyBlack(join(inDir, f), join(pub, t));
for (const [f, t, w] of SCENES) await scene(join(inDir, f), join(pub, t), w);
console.log("\nDone.\n");
