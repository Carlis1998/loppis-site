import { describe, it, expect } from "vitest";
import {
  parseWeatherCode,
  isGoodDailyCode,
  nextGoodWeatherDate,
} from "../weather";

describe("parseWeatherCode", () => {
  it("returns sunny and isGoodWeather for code 0 (clear sky) during day", () => {
    expect(parseWeatherCode(0, true)).toEqual({
      status: "sunny",
      isGoodWeather: true,
    });
  });

  it("returns sunny for code 1 (mainly clear) during day", () => {
    expect(parseWeatherCode(1, true)).toEqual({
      status: "sunny",
      isGoodWeather: true,
    });
  });

  it("returns cloudy and isGoodWeather for code 2 (partly cloudy) during day", () => {
    expect(parseWeatherCode(2, true)).toEqual({
      status: "cloudy",
      isGoodWeather: true,
    });
  });

  it("returns cloudy and isGoodWeather for code 3 (overcast) during day", () => {
    expect(parseWeatherCode(3, true)).toEqual({
      status: "cloudy",
      isGoodWeather: true,
    });
  });

  it("returns rainy and not isGoodWeather for code 61 (rain) during day", () => {
    expect(parseWeatherCode(61, true)).toEqual({
      status: "rainy",
      isGoodWeather: false,
    });
  });

  it("returns unknown and not isGoodWeather at night even for clear sky", () => {
    expect(parseWeatherCode(0, false)).toEqual({
      status: "unknown",
      isGoodWeather: false,
    });
  });
});

describe("isGoodDailyCode", () => {
  it("treats clear through overcast (0-3) as good", () => {
    expect([0, 1, 2, 3].every(isGoodDailyCode)).toBe(true);
  });
  it("treats rain/fog/snow (>=45) as bad", () => {
    expect([45, 61, 71, 95].some(isGoodDailyCode)).toBe(false);
  });
});

describe("nextGoodWeatherDate", () => {
  const daily = {
    time: ["2026-06-02", "2026-06-03", "2026-06-04", "2026-06-05"],
    weathercode: [61, 80, 3, 0], // today rain, tomorrow rain, then overcast (good), then clear
  };

  it("returns the first fair-weather day from tomorrow onward", () => {
    expect(nextGoodWeatherDate(daily)).toBe("2026-06-04");
  });

  it("respects a custom start index", () => {
    expect(nextGoodWeatherDate(daily, 3)).toBe("2026-06-05");
  });

  it("returns null when no good day is found", () => {
    expect(
      nextGoodWeatherDate({ time: ["2026-06-02", "2026-06-03"], weathercode: [61, 95] })
    ).toBeNull();
  });

  it("returns null for missing/empty data", () => {
    expect(nextGoodWeatherDate(undefined)).toBeNull();
    expect(nextGoodWeatherDate({})).toBeNull();
  });
});
