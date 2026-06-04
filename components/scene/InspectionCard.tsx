"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Category } from "@/content/categories";
import { withBasePath } from "@/lib/paths";

export function InspectionCard({
  category,
  onClose,
  closed = false,
  packedAwayCopy,
}: {
  category: Category | null;
  onClose: () => void;
  /** scene is in closed (bad weather) mode */
  closed?: boolean;
  /** localized "wrapped up until the sun returns" caption */
  packedAwayCopy?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!category) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [category, onClose]);

  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={category.name}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-3xl bg-[color:var(--color-parchment)] p-6 shadow-2xl ring-1 ring-black/10 sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-[color:var(--color-bark)]">
            {category.name}
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Stäng"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)]"
          >
            ✕
          </button>
        </div>
        <div className="mt-3 h-px w-12 bg-[color:var(--color-coral)]/40" aria-hidden />
        <p className="mt-3 text-[#5b4631]">{category.blurb}</p>
        <p className="mt-3 text-sm text-[#5b4631]">
          <strong>Det här hittar du:</strong> {category.whatYoullFind}
        </p>
        {closed ? (
          <p className="mt-3 rounded-2xl bg-[#2b3a4a]/10 px-4 py-3 text-sm font-medium text-[#3a4654]">
            {packedAwayCopy ?? "Inplastat tills solen är tillbaka. ☂️"}
          </p>
        ) : (
          <p className="mt-1 text-sm font-semibold text-[color:var(--color-coral)]">
            {category.priceVibe}
          </p>
        )}
        {category.photos[0] && (
          <div className="relative mt-4 h-48 overflow-hidden rounded-2xl">
            <Image
              src={withBasePath(category.photos[0].src)}
              alt={category.photos[0].alt}
              fill
              className="object-cover"
              sizes="(max-width:640px) 100vw, 32rem"
            />
          </div>
        )}
        <p className="mt-4 text-xs text-[#80715c]">{category.availability}</p>
      </div>
    </div>
  );
}
