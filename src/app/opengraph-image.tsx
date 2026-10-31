import { ImageResponse } from "next/og";
import { portfolio } from "@/content/portfolio";

export const alt =
  "Ronn Saimund Rosarito — IT student and software developer. Useful software. Thoughtfully built.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 80px",
        background: "#f7f8fa",
        color: "#18212f",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 25,
        }}
      >
        <span style={{ color: "#2855e8", fontSize: 45, fontWeight: 700 }}>
          {portfolio.profile.initials}.
        </span>
        <span>IT STUDENT & SOFTWARE DEVELOPER</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 82,
          lineHeight: 1.08,
          letterSpacing: "-4px",
          fontWeight: 700,
        }}
      >
        <span>Useful software.</span>
        <span style={{ color: "#2855e8" }}>Thoughtfully built.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
        }}
      >
        <span>{portfolio.profile.name}</span>
        <span>WEB / MOBILE / COLLABORATION</span>
      </div>
    </div>,
    size,
  );
}
