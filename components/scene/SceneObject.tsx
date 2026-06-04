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

        {/* Tap hint: pulsing coral dot, only while this object is un-inspected. */}
        {!seen && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-1 top-1 flex h-3.5 w-3.5"
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-coral)] opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[color:var(--color-coral)] ring-2 ring-white/85" />
          </span>
        )}
      </span>

      <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#3a2a18]/90 px-3 py-1 text-xs font-medium text-[#f7ecd8] opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {category.name}
        {seen ? " ✓" : ""}
      </span>
    </button>
  );
}
