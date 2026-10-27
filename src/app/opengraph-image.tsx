import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "GO Along รับเขียนโปรแกรม พัฒนาซอฟต์แวร์ และดูแลระบบไอที";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = path.join(
  process.cwd(),
  "node_modules/@fontsource/ibm-plex-sans-thai/files",
);

export default async function OgImage() {
  const [thai, latin] = await Promise.all([
    readFile(path.join(fontDir, "ibm-plex-sans-thai-thai-600-normal.woff")),
    readFile(path.join(fontDir, "ibm-plex-sans-thai-latin-600-normal.woff")),
  ]);

  const lamps = ["#3ecf8e", "#3ecf8e", "#3ecf8e", "#3ecf8e", "#f2b630"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17221e",
          color: "#f6f7f4",
          padding: "72px",
          fontFamily: "PlexLatin, PlexThai",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {lamps.map((c, i) => (
              <div
                key={i}
                style={{ width: 22, height: 22, borderRadius: 11, background: c }}
              />
            ))}
          </div>
          <div style={{ fontSize: 34 }}>GO Along</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, lineHeight: 1.25 }}>
            รับเขียนโปรแกรมและดูแลระบบไอที
          </div>
          <div style={{ fontSize: 40, color: "#8fa59a" }}>
            สำหรับธุรกิจและโรงงานไทย ครบในทีมเดียว
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#b9cbc1" }}>
          goalong.co.th · 085 608 3298 · LINE @goalong
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "PlexLatin", data: latin, weight: 600, style: "normal" },
        { name: "PlexThai", data: thai, weight: 600, style: "normal" },
      ],
    },
  );
}
