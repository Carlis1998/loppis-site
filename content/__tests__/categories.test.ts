import { describe, it, expect } from "vitest";
import { categories } from "@/content/categories";

describe("categories", () => {
  it("has the six expected category ids in order", () => {
    expect(categories.map((c) => c.id)).toEqual([
      "bocker",
      "kort",
      "samlarprylar",
      "elektronik",
      "klader",
      "blandat",
    ]);
  });

  it("every category has required content fields", () => {
    for (const c of categories) {
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.blurb.length).toBeGreaterThan(0);
      expect(c.whatYoullFind.length).toBeGreaterThan(0);
      expect(c.priceVibe.length).toBeGreaterThan(0);
      expect(c.availability.length).toBeGreaterThan(0);
      expect(c.objectAsset).toMatch(/^object-[a-z]+$/);
    }
  });

  it("coords are percentages within 0-100 and a positive scale for both orientations", () => {
    for (const c of categories) {
      for (const o of [c.coords.landscape, c.coords.portrait]) {
        expect(o.x).toBeGreaterThanOrEqual(0);
        expect(o.x).toBeLessThanOrEqual(100);
        expect(o.y).toBeGreaterThanOrEqual(0);
        expect(o.y).toBeLessThanOrEqual(100);
        expect(o.scale).toBeGreaterThan(0);
      }
    }
  });

  it("photos reference existing public image paths", () => {
    for (const c of categories) {
      for (const p of c.photos) {
        expect(p.src.startsWith("/images/")).toBe(true);
        expect(p.alt.length).toBeGreaterThan(0);
      }
    }
  });
});
