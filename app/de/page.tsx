import type { Metadata } from "next";
import { LocalizedInfoPage } from "@/components/LocalizedInfoPage";
import { landing, hreflangAlternates, localePath } from "@/content/locales";

export const metadata: Metadata = {
  title: landing.de.metaTitle,
  description: landing.de.metaDescription,
  alternates: {
    canonical: localePath.de,
    languages: hreflangAlternates,
  },
  openGraph: {
    title: landing.de.metaTitle,
    description: landing.de.metaDescription,
    type: "website",
    locale: "de",
    url: localePath.de,
  },
};

export default function GermanPage() {
  return <LocalizedInfoPage locale="de" />;
}
