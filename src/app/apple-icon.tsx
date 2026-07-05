import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(90deg, #22c55e 0%, #8b5cf6 50%, #06b6d4 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 112,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            display: "flex",
            background:
              "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          M
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#71717a",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginTop: 4,
            display: "flex",
          }}
        >
          swe
        </div>
      </div>
    ),
    { ...size },
  );
}
