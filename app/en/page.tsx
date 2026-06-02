import type { Metadata } from "next";
import { LocalizedInfoPage } from "@/components/LocalizedInfoPage";
import { landing, hreflangAlternates, localePath } from "@/content/locales";

export const metadata: Metadata = {
  title: landing.en.metaTitle,
  description: landing.en.metaDescription,
  alternates: {
    canonical: localePath.en,
    languages: hreflangAlternates,
  },
  openGraph: {
    title: landing.en.metaTitle,
    description: landing.en.metaDescription,
    type: "website",
    locale: "en",
    url: localePath.en,
  },
};

export default function EnglishPage() {
  return <LocalizedInfoPage locale="en" />;
}
