import { CourtyardScene } from "@/components/scene/CourtyardScene";
import { IntroSplash } from "@/components/scene/IntroSplash";
import { AmbientAudio } from "@/components/scene/AmbientAudio";
import { CategoryFallbackList } from "@/components/CategoryFallbackList";
import { WeatherBanner } from "@/components/WeatherBanner";
import { WeatherModuleTracker } from "@/components/WeatherModuleTracker";
import { VisitInfo } from "@/components/VisitInfo";
import { LanguageBlocks } from "@/components/LanguageBlocks";
import { FAQ } from "@/components/FAQ";
import { ScrollTracker } from "@/components/ScrollTracker";
import { getWeatherStatus } from "@/lib/weather";
import { providedSlots } from "@/lib/provided-assets";

export default async function HomePage() {
  const weather = await getWeatherStatus();

  return (
    <main>
      <IntroSplash />
      <WeatherBanner weather={weather} />
      <WeatherModuleTracker weatherStatus={weather.status} />
      <CourtyardScene
        providedSlots={providedSlots}
        weather={{
          isGoodWeather: weather.isGoodWeather,
          status: weather.status,
          nextGoodDate: weather.nextGoodDate,
        }}
      />
      <CategoryFallbackList />
      <VisitInfo />
      <LanguageBlocks />
      <FAQ />
      <footer className="border-t border-[color:var(--color-hairline)] bg-white px-6 py-10 text-center text-sm text-[color:var(--color-ink-muted)]">
        <p className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <span className="font-semibold text-[color:var(--color-ink)]">
            Innegårdsloppis
          </span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>Södra Murgatan 4, Visby</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Södra+Murgatan+4+Visby"
            className="font-medium text-[color:var(--color-coral)] underline decoration-[color:var(--color-coral)]/30 underline-offset-[5px] transition hover:decoration-[color:var(--color-coral)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visa på karta
          </a>
        </p>
      </footer>
      <AmbientAudio />
      <ScrollTracker />
    </main>
  );
}
