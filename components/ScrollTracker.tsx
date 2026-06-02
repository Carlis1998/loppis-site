"use client";

import { useEffect, useRef } from "react";
import { trackEvent, Events } from "@/lib/posthog";

export function ScrollTracker() {
  const fired50 = useRef(false);
  const fired90 = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (!fired50.current && scrolled >= 0.5) {
        fired50.current = true;
        trackEvent(Events.SCROLL_50);
      }
      if (!fired90.current && scrolled >= 0.9) {
        fired90.current = true;
        trackEvent(Events.SCROLL_90);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
