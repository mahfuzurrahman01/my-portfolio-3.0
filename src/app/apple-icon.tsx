import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const AVATAR =
  "https://res.cloudinary.com/dka0q8f82/image/upload/c_fill,g_face,z_1,ar_1:1,w_360,q_auto,f_png/v1778646505/WhatsApp_Image_2026-05-12_at_23.02.53_pvo31f.jpg";

export default function AppleIcon() {
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AVATAR}
          width={180}
          height={180}
          alt="Mafuzur Rahman"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
