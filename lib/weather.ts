import { site } from "@/content/site";

export type WeatherStatus = "sunny" | "cloudy" | "rainy" | "unknown";

export interface WeatherResult {
  status: WeatherStatus;
  isGoodWeather: boolean;
  bannerCopy: string;
  weatherStatus: WeatherStatus;
  /** Current temperature in °C, rounded, or null if unavailable. */
  temperature: number | null;
  /** ISO yyyy-mm-dd of the next fair-weather day, or null if none/unknown. */
  nextGoodDate: string | null;
}

/**
 * Parse Open-Meteo WMO weather code into simplified status.
 * WMO codes: 0=clear, 1=mainly clear, 2=partly cloudy, 3=overcast, 45+=fog/rain/snow
 */
export function parseWeatherCode(
  code: number,
  isDay: boolean
): { status: WeatherStatus; isGoodWeather: boolean } {
  if (!isDay) return { status: "unknown", isGoodWeather: false };
  if (code <= 1) return { status: "sunny", isGoodWeather: true };
  if (code <= 3) return { status: "cloudy", isGoodWeather: true };
  return { status: "rainy", isGoodWeather: false };
}

/** A daily weather code is "good" if it is clear, mainly clear, partly cloudy or overcast. */
export function isGoodDailyCode(code: number): boolean {
  return code <= 3;
}

/**
 * Given Open-Meteo daily arrays, return the ISO date of the next fair-weather day.
 * Scans from `fromIndex` (default 1 = tomorrow) onward. Returns null if none found.
 */
export function nextGoodWeatherDate(
  daily: { time?: string[]; weathercode?: number[] } | undefined,
  fromIndex = 1
): string | null {
  const times = daily?.time ?? [];
  const codes = daily?.weathercode ?? [];
  for (let i = fromIndex; i < times.length; i++) {
    if (typeof codes[i] === "number" && isGoodDailyCode(codes[i])) {
      return times[i];
    }
  }
  return null;
}

export async function getWeatherStatus(): Promise<WeatherResult> {
  const { lat, lon } = site.coordinates;
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=weathercode,is_day,temperature_2m&daily=weathercode` +
        `&forecast_days=7&timezone=auto`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`Weather API returned ${res.status}`);

    const data = await res.json();
    const code: number = data.current?.weathercode ?? 99;
    const isDay: boolean = data.current?.is_day === 1;
    const temp = data.current?.temperature_2m;

    const { status, isGoodWeather } = parseWeatherCode(code, isDay);
    const nextGoodDate = isGoodWeather ? null : nextGoodWeatherDate(data.daily);

    // Status-aware lead line. The reopening promise is left to the banner, which
    // can name the specific next-sunny weekday from nextGoodDate.
    const bannerCopy =
      status === "sunny"
        ? "Soligt i Visby idag, innegården är öppen."
        : status === "cloudy"
          ? "Mulet men uppehåll i Visby, innegården är öppen."
          : "Det regnar i Visby just nu, innegården är stängd.";

    return {
      status,
      isGoodWeather,
      weatherStatus: status,
      temperature: typeof temp === "number" ? Math.round(temp) : null,
      nextGoodDate,
      bannerCopy,
    };
  } catch {
    return {
      status: "unknown",
      isGoodWeather: false,
      weatherStatus: "unknown",
      temperature: null,
      nextGoodDate: null,
      bannerCopy: site.openingLogic,
    };
  }
}
