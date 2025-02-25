import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        letterSpacing: "-.02em",
        fontWeight: 700,
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px 50px",
          margin: "0 42px",
          fontSize: 40,
          width: "auto",
          maxWidth: 550,
          textAlign: "center",
          color: "black",
          lineHeight: 1.4,
        }}
      >
        Claudio Angrigiani
      </div>
    </div>
  );
}
