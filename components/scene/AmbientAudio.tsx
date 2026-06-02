"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";

/** Ambient courtyard sound. OFF by default; never autoplays. */
export function AmbientAudio({ src = withBasePath("/scene/ambience.mp3") }: { src?: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.35;
    if (on) a.play().catch(() => setOn(false));
    else a.pause();
  }, [on]);

  return (
    <>
      <audio ref={ref} src={src} preload="none" />
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        aria-label={on ? "Stäng av ljud" : "Slå på ljud"}
        title={on ? "Stäng av ljud" : "Slå på ljud"}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-bark)]/85 text-lg text-[#f7ecd8] shadow-lg backdrop-blur transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-coral)]"
      >
        {on ? "🔊" : "🔈"}
      </button>
    </>
  );
}
