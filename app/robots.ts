import { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "DuckDuckBot",
          "Applebot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Amzn-SearchBot",
          "Amzn-User",
          "CCBot",
          "meta-externalagent",
          "meta-externalfetcher",
          "Bytespider",
          "GrokBot",
          "xAI-Grok",
          "Grok-DeepSearch",
        ],
        allow: "/",
      },
    ],
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
