import type { WeatherResult, WeatherStatus } from "@/lib/weather";
import { formatWeekday } from "@/content/locales";

const STATUS_ICON: Record<WeatherStatus, string> = {
  sunny: "☀️",
  cloudy: "⛅️",
  rainy: "🌧️",
  unknown: "☁️",
};

interface WeatherBannerProps {
  weather: WeatherResult;
}

export function WeatherBanner({ weather }: WeatherBannerProps) {
  const good = weather.isGoodWeather;

  // When closed, name the next fair-weather weekday if we know it.
  const weekday =
    !good && weather.nextGoodDate ? formatWeekday(weather.nextGoodDate, "sv") : "";
  const reopen = !good
    ? weekday
      ? `Öppnar troligen igen på ${weekday}.`
      : "Vi öppnar igen vid fint väder."
    : "";

  return (
    <div
      className={`w-full border-b text-center text-sm ${
        good
          ? "border-[color:var(--color-coral)]/20 bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)]"
          : "border-[color:var(--color-hairline)] bg-white text-[color:var(--color-ink-muted)]"
      }`}
      aria-label="Öppningsstatus"
      aria-live="polite"
    >
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2.5 font-medium">
        <span aria-hidden>{STATUS_ICON[weather.status]}</span>
        <span>{weather.bannerCopy}</span>

        {weather.temperature !== null && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
              good
                ? "bg-[color:var(--color-coral)]/12 text-[color:var(--color-coral)]"
                : "bg-[color:var(--color-ink-muted)]/12 text-[color:var(--color-ink-muted)]"
            }`}
          >
            {weather.temperature}°C
          </span>
        )}

        {reopen && (
          <span className="text-[color:var(--color-ink-muted)]">{reopen}</span>
        )}
      </p>
    </div>
  );
}
