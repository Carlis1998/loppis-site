import { describe, it, expect, afterEach } from "vitest";
import { getHeroVariant } from "../flags";

afterEach(() => {
  delete process.env.HERO_VARIANT;
});

describe("getHeroVariant", () => {
  it("defaults to sodertorg when env var is absent", async () => {
    const variant = await getHeroVariant();
    expect(variant).toBe("sodertorg");
  });

  it("returns sodertorg when env var is sodertorg", async () => {
    process.env.HERO_VARIANT = "sodertorg";
    const variant = await getHeroVariant();
    expect(variant).toBe("sodertorg");
  });

  it("returns courtyard when env var is courtyard", async () => {
    process.env.HERO_VARIANT = "courtyard";
    const variant = await getHeroVariant();
    expect(variant).toBe("courtyard");
  });

  it("falls back to sodertorg for an invalid value", async () => {
    process.env.HERO_VARIANT = "invalid-value";
    const variant = await getHeroVariant();
    expect(variant).toBe("sodertorg");
  });
});
