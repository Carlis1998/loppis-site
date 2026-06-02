import { withBasePath } from "@/lib/paths";

/** "object-bocker" -> "/scene/objects/bocker.png" (or "...-rain.png" when raining) */
export function objectAssetPath(assetSlot: string, rain = false): string {
  const key = assetSlot.replace(/^object-/, "");
  return withBasePath(`/scene/objects/${key}${rain ? "-rain" : ""}.png`);
}

/** Background image path for an orientation, sunny or rainy. */
export function backgroundPath(
  orientation: "landscape" | "portrait",
  rain = false,
): string {
  return withBasePath(`/scene/scene-background-${orientation}${rain ? "-rain" : ""}.png`);
}

/** Manifest slot id for a background, used to check `providedSlots`. */
export function backgroundSlot(
  orientation: "landscape" | "portrait",
  rain = false,
): string {
  return `scene-background-${orientation}${rain ? "-rain" : ""}`;
}

/**
 * Whether a real generated asset exists (vs placeholder).
 * providedSlots comes from the asset manifest (status === "provided").
 */
export function hasRealAsset(assetSlot: string, providedSlots: Set<string>): boolean {
  return providedSlots.has(assetSlot);
}

export function progressLabel(seen: number, total: number): string {
  return `${seen} av ${total} stånd utforskade`;
}
