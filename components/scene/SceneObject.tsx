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
      className="group absolute h-[20vmin] min-h-[88px] w-[20vmin] min-w-[88px] cursor-pointer transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--color-coral)]/70 focus-visible:ring-offset-2"
    >
      {hasArt || useRain ? (
        <Image
          src={objectAssetPath(category.objectAsset, useRain)}
          alt=""
          fill
          sizes="20vmin"
          className="object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)]"
        />
      ) : (
        <ObjectPlaceholder category={category} />
      )}
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#3a2a18]/90 px-3 py-1 text-xs font-medium text-[#f7ecd8] opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {category.name}
        {seen ? " ✓" : ""}
      </span>
    </button>
  );
}
