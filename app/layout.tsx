import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import { site } from "@/content/site";
import { withBasePath } from "@/lib/paths";
import { hreflangAlternates } from "@/content/locales";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

// Display face for the big editorial moments (hero + section headings). Fraunces
// is a warm, old-style optical serif — its vintage character suits a courtyard
// flea market and pairs against Figtree's clean grotesque for body/UI.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-fraunces",
  display: "swap",
});

// Search-engine ownership verification. Paste the codes Google Search Console
// and Bing Webmaster Tools give you into these env vars (no quotes) and redeploy;
// until then the tags are simply omitted. Both also support DNS/file verification.
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: site.seoTitle,
  description: site.seoDescription,
  metadataBase: new URL(site.siteUrl),
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    type: "website",
    locale: "sv_SE",
    siteName: site.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: hreflangAlternates,
  },
  ...((googleVerification || bingVerification) && {
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
    },
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${figtree.variable} ${fraunces.variable}`}>
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          title={`${site.siteName} Markdown`}
          href={withBasePath("/index.html.md")}
        />
        <link
          rel="describedby"
          type="text/plain"
          title="LLM summary"
          href={withBasePath("/llms.txt")}
        />
      </head>
      <body className="font-sans bg-white text-[color:var(--color-ink)]">
        {/* Keyboard skip link: hidden until focused, then jumps past the scene to
            the main content (which carries id="main" tabIndex={-1}). */}
        <a
          href="#main"
          className="sr-only z-[100] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-[color:var(--color-coral)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-[var(--shadow-pill)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-coral)]"
        >
          Hoppa till innehåll
        </a>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
