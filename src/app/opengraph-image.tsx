import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TutorSync - Find the Best Tutors Near You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
            }}
          >
            🎓
          </div>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            TutorSync
          </span>
        </div>
        <span
          style={{
            fontSize: "32px",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "32px",
          }}
        >
          Find the Best Tutors Near You
        </span>
        <div
          style={{
            display: "flex",
            gap: "40px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>10,000+ Verified Tutors</span>
          <span>•</span>
          <span>200+ Subjects</span>
          <span>•</span>
          <span>50 States</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
