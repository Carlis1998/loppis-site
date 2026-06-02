"use client";

import posthog from "posthog-js";
import type { HeroVariant } from "./flags";
import type { WeatherStatus } from "./weather";

export type EventProperties = {
  hero_variant?: HeroVariant;
  weather_status?: WeatherStatus;
  location?: string;
  label?: string;
  image_id?: string;
  index?: number;
  object_id?: string;
  surface?: string;
  mode?: "open" | "closed";
};

export function trackEvent(event: string, props?: EventProperties) {
  posthog.capture(event, props);
}

/**
 * Canonical event names — use these everywhere, never raw strings.
 * Events omitted from MVP (no UI yet):
 *   - contact_click: no phone/email in content/site.ts
 *   - language_toggle_de/en: LanguageBlocks are static; add if interactive toggle is built
 */
export const Events = {
  HERO_CTA_CLICK: "hero_cta_click",
  MAP_CLICK: "map_click",
  GALLERY_INTERACTION: "gallery_interaction",
  OBJECT_INSPECT: "object_inspect",
  WEATHER_MODULE_VISIBLE: "weather_module_visible",
  WEATHER_PREVIEW_TOGGLE: "weather_preview_toggle",
  SCROLL_50: "scroll_50",
  SCROLL_90: "scroll_90",
} as const;
