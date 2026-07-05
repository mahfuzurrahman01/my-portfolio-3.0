import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
          color: "#0a0a0a",
          fontSize: 22,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.06em",
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
