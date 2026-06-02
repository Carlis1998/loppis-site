import { describe, it, expect } from "vitest";
import { providedSlots } from "@/lib/provided-assets";
import manifest from "@/assets-to-generate/manifest.json";

type Slot = { id: string; status: "placeholder" | "provided" };

describe("providedSlots", () => {
  it("is an array of slot ids", () => {
    expect(Array.isArray(providedSlots)).toBe(true);
    expect(providedSlots.every((id) => typeof id === "string")).toBe(true);
  });

  it("contains exactly the manifest slots marked provided", () => {
    const expected = (manifest.slots as Slot[])
      .filter((s) => s.status === "provided")
      .map((s) => s.id);
    expect([...providedSlots].sort()).toEqual([...expected].sort());
  });

  it("excludes placeholder slots", () => {
    const placeholders = (manifest.slots as Slot[])
      .filter((s) => s.status === "placeholder")
      .map((s) => s.id);
    for (const id of placeholders) {
      expect(providedSlots).not.toContain(id);
    }
  });
});
