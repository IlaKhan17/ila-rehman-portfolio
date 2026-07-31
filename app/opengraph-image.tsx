import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

/**
 * The share card. Type and the monogram, no photograph, by design.
 * Statically generated at build time; no fonts fetched, so the build cannot
 * fail on a network hiccup.
 */

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#08080c",
          color: "#ecebf2",
          // The same violet field as the site, flattened for the card.
          backgroundImage:
            "radial-gradient(900px 900px at 88% -20%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(700px 700px at 0% 70%, rgba(109,63,214,0.20), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "1px solid #6d3fd6",
              backgroundColor: "rgba(139,92,246,0.15)",
              color: "#a78bfa",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {profile.monogram}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: "#34d399",
              }}
            />
            <div style={{ fontSize: 22, color: "#6e6d80" }}>
              {profile.availability}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div style={{ marginTop: 18, fontSize: 38, color: "#a78bfa" }}>
            {profile.role}
          </div>
          <div
            style={{
              marginTop: 26,
              maxWidth: 900,
              fontSize: 28,
              lineHeight: 1.45,
              color: "#a3a2b4",
            }}
          >
            Agentic systems, retrieval pipelines, and the evaluation layers that
            prove they work.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 22,
            color: "#6e6d80",
          }}
        >
          {profile.focus.map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid #23232f",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
