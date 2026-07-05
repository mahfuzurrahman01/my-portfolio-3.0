import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Mafuzur Rahman — Software Developer & AI Builder | mafuzur.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #22c55e 0%, #8b5cf6 33%, #06b6d4 66%, #f59e0b 100%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              color: "#71717a",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#22c55e",
                display: "flex",
              }}
            />
            mafuzur.com · Dhaka, Bangladesh
          </div>

          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              marginTop: 28,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Mafuzur Rahman
          </div>

          <div
            style={{
              fontSize: 40,
              marginTop: 18,
              color: "#d4d4d8",
              fontWeight: 500,
              display: "flex",
              letterSpacing: "-0.01em",
            }}
          >
            Software Developer & AI Builder
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "React Native",
              "AI / Agentic",
            ].map((t) => (
              <div
                key={t}
                style={{
                  border: "1px solid #27272a",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 999,
                  padding: "10px 22px",
                  fontSize: 22,
                  color: "#e4e4e7",
                  display: "flex",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
              borderTop: "1px solid #27272a",
              marginTop: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "#a1a1aa",
                letterSpacing: "-0.01em",
              }}
            >
              mafuzur.rahman032@gmail.com
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#71717a",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              4+ Years · Full-Stack · AI
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
