"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";

/**
 * Courtyard ambience from two looping public-domain field recordings
 * (garden birdsong + rain, both released to the public domain via PDSounds /
 * Wikimedia Commons). The two tracks are routed through Web Audio gain nodes and
 * crossfaded by the scene's data-weather attribute, so open mode hears birds and
 * closed (rainy) mode hears rain — and it follows the triple-tap preview too.
 *
 * Gain nodes (not the audio element's `volume`) do the fading because iOS Safari
 * ignores `HTMLMediaElement.volume`. OFF by default; the AudioContext is created
 * on the toggle click so autoplay policy lets it sound.
 */

const VOLUME = 0.5;

export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const birdsRef = useRef<HTMLAudioElement>(null);
  const rainRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainsRef = useRef<{ birds: GainNode; rain: GainNode } | null>(null);
  const onRef = useRef(false);
  const closedRef = useRef(false);

  const applyWeather = useCallback((closed: boolean) => {
    const ctx = ctxRef.current;
    const gains = gainsRef.current;
    if (!ctx || !gains) return;
    const t = ctx.currentTime;
    gains.birds.gain.setTargetAtTime(closed ? 0 : VOLUME, t, 0.6);
    gains.rain.gain.setTargetAtTime(closed ? VOLUME : 0, t, 0.6);
  }, []);

  // Follow the scene's weather mode (live weather + triple-tap preview).
  useEffect(() => {
    const scene = document.querySelector("section[data-weather]");
    if (!scene) return;
    const read = () => {
      const closed = scene.getAttribute("data-weather") === "closed";
      closedRef.current = closed;
      if (onRef.current) applyWeather(closed);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(scene, { attributes: true, attributeFilter: ["data-weather"] });
    return () => observer.disconnect();
  }, [applyWeather]);

  const toggle = useCallback(async () => {
    const birds = birdsRef.current;
    const rain = rainRef.current;
    if (!birds || !rain) return;

    // Lazily build the graph from this click so autoplay policy lets it sound.
    let ctx = ctxRef.current;
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new Ctor();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      const birdsGain = ctx.createGain();
      const rainGain = ctx.createGain();
      birdsGain.gain.value = 0;
      rainGain.gain.value = 0;
      ctx.createMediaElementSource(birds).connect(birdsGain).connect(master);
      ctx.createMediaElementSource(rain).connect(rainGain).connect(master);
      gainsRef.current = { birds: birdsGain, rain: rainGain };
    }
    const gains = gainsRef.current!;

    if (onRef.current) {
      onRef.current = false;
      setOn(false);
      const t = ctx.currentTime;
      gains.birds.gain.setTargetAtTime(0, t, 0.4);
      gains.rain.gain.setTargetAtTime(0, t, 0.4);
      window.setTimeout(() => {
        birds.pause();
        rain.pause();
      }, 700);
      return;
    }

    await ctx.resume();
    onRef.current = true;
    setOn(true);
    try {
      await Promise.all([birds.play(), rain.play()]);
    } catch {
      /* a play() rejection just leaves that track silent */
    }
    applyWeather(closedRef.current);
  }, [applyWeather]);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <>
      <audio ref={birdsRef} src={withBasePath("/scene/ambience.mp3")} loop preload="none" />
      <audio ref={rainRef} src={withBasePath("/scene/ambience-rain.mp3")} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
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
