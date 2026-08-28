import { ImageResponse } from "next/og";

import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem de Open Graph gerada no build (também usada pelo Twitter card).
 * Sem fonte customizada de propósito: o satori não lê woff2, e a fonte padrão
 * evita carregar um segundo arquivo binário só para o card.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 2, background: "#cdff4a" }} />
          <div
            style={{
              color: "#8a8a8a",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Portfólio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* O satori exige display:flex explícito em qualquer div com mais de
              um filho — daí o wrapper e os dois <span>. */}
          <div
            style={{
              display: "flex",
              color: "#ededed",
              fontSize: 148,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 1,
            }}
          >
            <span>{site.name}</span>
            <span style={{ color: "#cdff4a" }}>.</span>
          </div>
          <div style={{ color: "#8a8a8a", fontSize: 36, marginTop: 24 }}>{site.role}</div>
        </div>

        <div style={{ color: "#5c5c5c", fontSize: 24 }}>{site.location}</div>
      </div>
    ),
    size,
  );
}
