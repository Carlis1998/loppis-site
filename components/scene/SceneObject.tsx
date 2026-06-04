"use client";

import Image from "next/image";
import type { Category } from "@/content/categories";
import { objectAssetPath } from "@/lib/scene";
import { ObjectPlaceholder } from "./placeholders";

type Props = {
  category: Category;
  orientation: "landscape" | "portrait";
  hasArt: boolean;
  /** rain variant exists in /scene/objects/<key>-rain.png */
  hasRainArt: boolean;
  /** scene is in closed (bad weather) mode */
  closed: boolean;
  seen: boolean;
  onInspect: (id: string) => void;
};

export function SceneObject({
  category,
  orientation,
  hasArt,
  hasRainArt,
  closed,
  seen,
  onInspect,
}: Props) {
  const c = category.coords[orientation];
  const useRain = closed && hasRainArt;
  return (
    <button
      type="button"
      onClick={() => onInspect(category.id)}
      aria-label={`Titta närmare på ${category.name}`}
      style={{
        left: `${c.x}%`,
        top: `${c.y}%`,
        transform: `translate(-50%, -50%) scale(${c.scale})`,
      }}
      className="group absolute h-[20vmin] min-h-[88px] w-[20vmin] min-w-[88px] cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--color-coral)]/70 focus-visible:ring-offset-2"
    >
      {/* Bob layer: idle float draws the eye to un-inspected objects. */}
      <span
        className={`relative block h-full w-full ${
          seen ? "" : "motion-safe:animate-[object-bob_3.2s_ease-in-out_infinite]"
        }`}
      >
        {/* Media layer: hover-scale + once-seen fade. Kept separate from the
            bob layer so the two transforms never collide. */}
        <span
          className={`relative block h-full w-full transition duration-300 group-hover:scale-[1.06] group-focus-visible:scale-[1.06] ${
            seen ? "opacity-60 saturate-[0.8]" : ""
          }`}
        >
          {hasArt || useRain ? (
            <Image
              src={objectAssetPath(category.objectAsset, useRain)}
              alt=""
              fill
              sizes="20vmin"
              className="object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)] transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_18px_rgba(0,0,0,0.32)]"
            />
          ) : (
            <ObjectPlaceholder category={category} />
          )}
        </span>

        {/* Status pip: un-inspected → a calmly pulsing coral hint; once inspected
            → a steady coral check, so progress reads at a glance. */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-1 top-1 flex h-4 w-4"
        >
          {!seen && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-coral)] motion-safe:animate-[hint-pulse_2.4s_ease-out_infinite]" />
          )}
          <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--color-coral)] text-[9px] font-bold leading-none text-white ring-2 ring-white">
            {seen ? "✓" : ""}
          </span>
        </span>
      </span>

      <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[color:var(--color-bark)]/90 px-3 py-1 text-xs font-medium text-[color:var(--color-cream)] opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {category.name}
        {seen ? " ✓" : ""}
      </span>
    </button>
  );
}
