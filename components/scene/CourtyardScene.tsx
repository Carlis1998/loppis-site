"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories } from "@/content/categories";
import {
  weatherCopy,
  formatWeekday,
  type Locale,
} from "@/content/locales";
import {
  hasRealAsset,
  backgroundPath,
  backgroundSlot,
} from "@/lib/scene";
import type { WeatherStatus } from "@/lib/weather";
import { SceneObject } from "./SceneObject";
import { InspectionCard } from "./InspectionCard";
import { RainOverlay } from "./RainOverlay";
import { BackgroundPlaceholder } from "./placeholders";
import { trackEvent, Events } from "@/lib/posthog";

type SceneWeather = {
  isGoodWeather: boolean;
  status: WeatherStatus;
  nextGoodDate: string | null;
};

/**
 * The interactive courtyard. Reacts to live weather: fair weather → open & sunny,
 * bad weather → closed & rainy (rain art, falling-rain overlay, "closed" copy).
 * A hidden triple-tap on the status chip lets staff preview the other mode.
 */
export function CourtyardScene({
  providedSlots,
  weather,
  locale = "sv",
}: {
  providedSlots: string[];
  weather: SceneWeather;
  locale?: Locale;
}) {
  const provided = useMemo(() => new Set(providedSlots), [providedSlots]);
  const t = weatherCopy[locale];

  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  // null = follow live weather; otherwise force a preview mode
  const [forced, setForced] = useState<"open" | "closed" | null>(null);
  const tapsRef = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setOrientation(mq.matches ? "portrait" : "landscape");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const liveClosed = !weather.isGoodWeather;
  const closed = forced ? forced === "closed" : liveClosed;
  const isPreview = forced !== null && (forced === "closed") !== liveClosed;

  const bgSlot = backgroundSlot(orientation, closed);
  const bgProvided = hasRealAsset(bgSlot, provided);
  // graceful fallback: if a rainy bg is missing, reuse the sunny art (RainOverlay still sells the mood)
  const bgFallbackProvided = hasRealAsset(backgroundSlot(orientation, false), provided);
  const bgSrc = backgroundPath(orientation, closed && bgProvided);

  const active = categories.find((c) => c.id === activeId) ?? null;

  const inspect = (id: string) => {
    setActiveId(id);
    setSeen((s) => new Set(s).add(id));
    trackEvent(Events.OBJECT_INSPECT, { object_id: id, surface: "courtyard_scene" });
  };

  // Triple-tap the status chip to toggle the weather preview.
  const onChipTap = () => {
    const now = Date.now();
    const recent = [...tapsRef.current, now].filter((ts) => now - ts < 1200);
    tapsRef.current = recent;
    if (recent.length >= 3) {
      tapsRef.current = [];
      const next: "open" | "closed" = closed ? "open" : "closed";
      // returning to the live state clears the override
      setForced(next === (liveClosed ? "closed" : "open") ? null : next);
      trackEvent(Events.WEATHER_PREVIEW_TOGGLE, { mode: next });
    }
  };

  const weekday = closed && weather.nextGoodDate
    ? formatWeekday(weather.nextGoodDate, locale)
    : "";

  return (
    <section
      aria-label={closed ? t.closedBadge : t.exploreHint}
      data-weather={closed ? "closed" : "open"}
      className="relative mx-auto aspect-[3/4] w-full overflow-hidden sm:aspect-[16/9]"
    >
      {bgProvided || bgFallbackProvided ? (
        <Image src={bgSrc} alt="" fill priority className="object-cover" sizes="100vw" />
      ) : (
        <BackgroundPlaceholder />
      )}

      {closed && <RainOverlay />}

      {categories.map((c) => (
        <SceneObject
          key={c.id}
          category={c}
          orientation={orientation}
          hasArt={hasRealAsset(c.objectAsset, provided)}
          hasRainArt={hasRealAsset(`${c.objectAsset}-rain`, provided)}
          closed={closed}
          seen={seen.has(c.id)}
          onInspect={inspect}
        />
      ))}

      {/* Status chip — triple-tap to preview the other weather mode */}
      <button
        type="button"
        onClick={onChipTap}
        title={t.toggleHint}
        aria-label={t.toggleHint}
        className={`absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow backdrop-blur transition ${
          closed
            ? "bg-[#1f2933]/80 text-[#e7eef5]"
            : "bg-[color:var(--color-bark)]/80 text-[#f7ecd8]"
        }`}
      >
        <span aria-hidden>{closed ? "🌧️" : "☀️"}</span>
        {closed ? t.closedBadge : t.openBadge}
        {isPreview && (
          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
            {t.previewTag}
          </span>
        )}
      </button>

      <p
        aria-live="polite"
        className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-[color:var(--color-bark)]/80 px-4 py-1.5 text-xs font-medium text-[#f7ecd8] shadow"
      >
        {t.progress(seen.size, categories.length)}
      </p>

      {/* Closed banner — clearly shut, still over a tappable scene */}
      {closed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-5">
          <div className="pointer-events-auto max-w-md rounded-2xl bg-[#1b2530]/85 px-5 py-4 text-center text-[#eef3f8] shadow-2xl ring-1 ring-white/10 backdrop-blur">
            <p
              className="text-base font-bold motion-safe:animate-[sign-swing_3.5s_ease-in-out_infinite]"
              style={{ transformOrigin: "top center" }}
            >
              🚪 {t.closedTitle}
            </p>
            <p className="mt-1 text-sm text-[#cdd8e3]">{t.closedLead}</p>
            <p className="mt-2 text-sm font-medium text-[#ffd9a8]">
              {weekday ? t.nextGood(weekday) : t.nextGoodUnknown}
            </p>
          </div>
        </div>
      )}

      <InspectionCard
        category={active}
        onClose={() => setActiveId(null)}
        closed={closed}
        packedAwayCopy={t.packedAway}
      />
    </section>
  );
}
