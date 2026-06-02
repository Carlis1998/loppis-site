export type HeroVariant = "sodertorg" | "courtyard";

const VALID_VARIANTS: HeroVariant[] = ["sodertorg", "courtyard"];

/**
 * Reads hero variant from environment variable.
 * Defaults to "sodertorg" for any missing or invalid value.
 *
 * Upgrade path: replace with @vercel/flags for targeting and gradual rollout.
 */
export async function getHeroVariant(): Promise<HeroVariant> {
  const raw = process.env.HERO_VARIANT;
  if (raw && VALID_VARIANTS.includes(raw as HeroVariant)) {
    return raw as HeroVariant;
  }
  return "sodertorg";
}
