"use client";

import { useEffect } from "react";
import { trackEvent, Events } from "@/lib/posthog";
import type { WeatherStatus } from "@/lib/weather";

interface Props {
  weatherStatus: WeatherStatus;
}

export function WeatherModuleTracker({ weatherStatus }: Props) {
  useEffect(() => {
    trackEvent(Events.WEATHER_MODULE_VISIBLE, { weather_status: weatherStatus });
  }, [weatherStatus]);

  return null;
}
