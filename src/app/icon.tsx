import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

const AVATAR = siteConfig.avatarSquare;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
        }}
      >
        <img
          src={AVATAR}
          width={192}
          height={192}
          alt={siteConfig.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
