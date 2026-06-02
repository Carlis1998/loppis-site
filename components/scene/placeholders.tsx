import type { Category } from "@/content/categories";

/** Stand-in object shown until real artwork lands in /scene/objects/<key>.png */
export function ObjectPlaceholder({ category }: { category: Category }) {
  return (
    <div
      aria-hidden
      className="flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#b8895a]/70 bg-[#f3e6cf]/90 p-3 text-center shadow-[0_6px_16px_rgba(0,0,0,0.14)] backdrop-blur-[1px]"
    >
      <span className="text-2xl">🧺</span>
      <span className="mt-1 text-[11px] font-semibold leading-tight text-[#5b3d22]">
        {category.name}
      </span>
    </div>
  );
}

/** Stand-in courtyard background until scene art lands. */
export function BackgroundPlaceholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-b from-[#bfe0ef] via-[#f3ead7] to-[#cdbf9a]"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[#b79a6b]/40" />
      <div className="absolute inset-x-0 top-6 text-center text-[11px] uppercase tracking-[0.2em] text-[#5b4631]/60">
        Innegården · platshållare tills illustrationen är klar
      </div>
    </div>
  );
}
