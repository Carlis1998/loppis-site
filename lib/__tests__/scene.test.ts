import { describe, it, expect } from "vitest";
import { objectAssetPath, progressLabel, hasRealAsset } from "@/lib/scene";

describe("scene helpers", () => {
  it("maps an asset slot id to the public objects path", () => {
    expect(objectAssetPath("object-bocker")).toBe("/scene/objects/bocker.png");
  });

  it("hasRealAsset reflects the provided set", () => {
    expect(hasRealAsset("object-bocker", new Set())).toBe(false);
    expect(hasRealAsset("object-bocker", new Set(["object-bocker"]))).toBe(true);
  });

  it("progressLabel renders a Swedish x/total string", () => {
    expect(progressLabel(0, 6)).toBe("0 av 6 stånd utforskade");
    expect(progressLabel(3, 6)).toBe("3 av 6 stånd utforskade");
  });
});
