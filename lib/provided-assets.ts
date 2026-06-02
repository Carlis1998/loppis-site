import manifest from "../assets-to-generate/manifest.json";

type Slot = { id: string; status: "placeholder" | "provided" };

/** Asset slot ids whose real artwork has been wired in (manifest status === "provided"). */
export const providedSlots: string[] = (manifest.slots as Slot[])
  .filter((s) => s.status === "provided")
  .map((s) => s.id);
