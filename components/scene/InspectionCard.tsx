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
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!category) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap: keep Tab / Shift+Tab cycling inside the open dialog so
      // keyboard and screen-reader users can't wander into the page behind it.
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [category, onClose]);

  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm motion-safe:animate-[backdrop-in_0.25s_ease-out] sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={category.name}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-3xl bg-[color:var(--color-parchment)] p-6 shadow-2xl ring-1 ring-black/10 motion-safe:opacity-0 motion-safe:animate-[card-rise_0.34s_cubic-bezier(0.22,1,0.36,1)_forwards] sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-[color:var(--color-bark)]">
            {category.name}
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Stäng"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow transition motion-safe:active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)]"
          >
            ✕
          </button>
        </div>
        <div className="mt-3 h-px w-12 bg-[color:var(--color-coral)]/40" aria-hidden />
        <p className="mt-3 text-[color:var(--color-bark-soft)]">{category.blurb}</p>
        <p className="mt-3 text-sm text-[color:var(--color-bark-soft)]">
          <strong>Det här hittar du:</strong> {category.whatYoullFind}
        </p>
        {closed ? (
          <p className="mt-3 flex items-start gap-2 rounded-2xl bg-[color:var(--color-slate-panel)]/10 px-4 py-3 text-sm font-medium text-[color:var(--color-slate-ink)]">
            <span aria-hidden className="flex-none">
              ☂️
            </span>
            <span>{packedAwayCopy ?? "Inplastat tills solen är tillbaka."}</span>
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
        <p className="mt-4 text-xs text-[color:var(--color-bark-faint)]">
          {category.availability}
        </p>
      </div>
    </div>
  );
}
