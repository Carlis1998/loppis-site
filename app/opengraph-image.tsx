import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = site.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const locationLine = `${site.address} · ${site.city} · ${site.nearbyLandmark}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F0E8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 15,
            color: "#78716c",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 36,
            display: "flex",
          }}
        >
          {locationLine}
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#1c1917",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 28,
            display: "flex",
          }}
        >
          {site.siteName}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#57534e",
            textAlign: "center",
            maxWidth: 820,
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          {site.seoDescription}
        </div>
      </div>
    ),
    size
  );
}
