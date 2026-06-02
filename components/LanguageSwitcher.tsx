import Link from "next/link";
import { locales, localeNames, localePath, type Locale } from "@/content/locales";

/**
 * Minimal pill-style language switcher. Server component — each option is just a
 * link to that locale's path, so it works with JS disabled and needs no client state.
 * The active locale is highlighted and marked aria-current.
 */
export function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1 rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-[color:var(--color-hairline)] backdrop-blur"
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={localePath[loc]}
            hrefLang={loc}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
              active
                ? "bg-[color:var(--color-bark)] text-[#f7ecd8]"
                : "text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]"
            }`}
          >
            {localeNames[loc]}
          </Link>
        );
      })}
    </nav>
  );
}
