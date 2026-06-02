import type { WeatherResult } from "@/lib/weather";

interface WeatherBannerProps {
  weather: WeatherResult;
}

export function WeatherBanner({ weather }: WeatherBannerProps) {
  const good = weather.isGoodWeather;
  return (
    <div
      className={`w-full border-b text-center text-sm ${
        good
          ? "border-[color:var(--color-coral)]/20 bg-[color:var(--color-coral-soft)] text-[color:var(--color-coral)]"
          : "border-[color:var(--color-hairline)] bg-white text-[color:var(--color-ink-muted)]"
      }`}
      aria-label="Öppningsstatus"
    >
      <p className="flex items-center justify-center gap-2 py-2.5 font-medium">
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${
            good
              ? "bg-[color:var(--color-coral)]"
              : "bg-[color:var(--color-ink-muted)]"
          }`}
        />
        {weather.bannerCopy}
      </p>
    </div>
  );
}
