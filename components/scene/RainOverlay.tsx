/**
 * Pure-CSS falling rain for the "closed / bad weather" scene mode.
 * Two parallax layers of thin angled streaks plus a cool darkening wash.
 * Decorative only — hidden from assistive tech and calmed by prefers-reduced-motion.
 */
const streak = (alpha: number) =>
  `repeating-linear-gradient(102deg, transparent 0 9px, rgba(255,255,255,${alpha}) 9px 10px)`;

export function RainOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* cool, gloomy wash so the sunny art reads as overcast even before art loads */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b3a4a]/35 via-[#3a4654]/25 to-[#1f2933]/45" />
      {/* far, fine rain */}
      <div
        className="absolute inset-[-20%] opacity-40 motion-reduce:hidden animate-[rain-fall-far_0.9s_linear_infinite]"
        style={{
          backgroundImage: [streak(0.25), streak(0.25), streak(0.25), streak(0.25)].join(","),
          backgroundSize: "200px 200px",
          backgroundPosition: "14% 0, 40% 0, 66% 0, 90% 0",
        }}
      />
      {/* near, bolder rain */}
      <div
        className="absolute inset-[-20%] opacity-60 motion-reduce:hidden animate-[rain-fall-near_0.55s_linear_infinite]"
        style={{
          backgroundImage: [streak(0.45), streak(0.45), streak(0.45), streak(0.45)].join(","),
          backgroundSize: "260px 260px",
          backgroundPosition: "6% 0, 26% 0, 52% 0, 78% 0",
        }}
      />
    </div>
  );
}
