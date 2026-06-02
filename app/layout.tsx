import type { Metadata } from "next";
import { Figtree } from "next/font/google";
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
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: hreflangAlternates,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={figtree.variable}>
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
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
