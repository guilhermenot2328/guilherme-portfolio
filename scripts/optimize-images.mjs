/**
 * Otimizador de imagens do portfolio.
 *
 * Le os originais de `images/`, aplica crop/resize e grava .webp em `assets/`.
 * Os arquivos de `assets/` sao importados estaticamente pelos componentes, o que
 * permite ao next/image gerar automaticamente width/height e o blurDataURL do
 * `placeholder="blur"`.
 *
 * Uso:  npm run images
 *
 * Para trocar uma foto: substitua o arquivo em `images/`, ajuste a entrada
 * correspondente no MANIFEST abaixo (ou remova o `crop` para usar corte
 * automatico) e rode o script de novo.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = "images";
const OUT_DIR = "assets";

/** Largura maxima permitida para qualquer imagem gerada. */
const MAX_WIDTH = 1600;

/**
 * @typedef {{ source: string, out: string, crop?: { left: number, top: number, width: number, height: number }, width?: number, quality?: number }} Entry
 * @type {Entry[]}
 */
const MANIFEST = [
  {
    // Foto usada no Pixelated Canvas do hero. Crop fechado no rosto/torso:
    // o efeito de dots perde o fundo, entao enquadramento apertado rende mais.
    source: "Gui-image.jpg",
    out: "guilherme-hero",
    crop: { left: 20, top: 360, width: 680, height: 850 },
    quality: 90,
  },
  {
    // Foto usada no Chromatic Image da secao "Sobre mim".
    source: "WhatsApp Image 2023-11-03 at 10.13.08.jpeg",
    out: "guilherme-about",
    crop: { left: 96, top: 176, width: 620, height: 775 },
    quality: 88,
  },
  // TODO: adicionar prints dos projetos aqui quando existirem, ex.:
  // { source: "smallord-print.png", out: "project-smallord" },
  // { source: "sketch-to-image-print.png", out: "project-sketch-to-image" },
  // { source: "shorts-clipper-print.png", out: "project-shorts-clipper" },
];

async function build() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`[images] pasta "${SRC_DIR}/" nao encontrada.`);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const available = new Set(fs.readdirSync(SRC_DIR));
  const consumed = new Set();
  let generated = 0;

  for (const entry of MANIFEST) {
    if (!available.has(entry.source)) {
      console.warn(`[images] pulando "${entry.source}" (nao existe em ${SRC_DIR}/)`);
      continue;
    }
    consumed.add(entry.source);

    let pipeline = sharp(path.join(SRC_DIR, entry.source)).rotate();
    const meta = await pipeline.metadata();

    if (entry.crop) {
      const { left, top } = entry.crop;
      // Clampa o crop para nunca estourar os limites do original.
      const width = Math.min(entry.crop.width, (meta.width ?? 0) - left);
      const height = Math.min(entry.crop.height, (meta.height ?? 0) - top);
      pipeline = pipeline.extract({ left, top, width, height });
    }

    const target = Math.min(entry.width ?? MAX_WIDTH, MAX_WIDTH);
    pipeline = pipeline.resize({
      width: target,
      withoutEnlargement: true,
      fit: "inside",
    });

    const outPath = path.join(OUT_DIR, `${entry.out}.webp`);
    const info = await pipeline
      .webp({ quality: entry.quality ?? 85, effort: 6 })
      .toFile(outPath);

    const kb = (info.size / 1024).toFixed(1);
    console.log(`[images] ${entry.source} -> ${outPath} (${info.width}x${info.height}, ${kb} KB)`);
    generated += 1;
  }

  // Qualquer imagem nao mapeada vira um webp generico (max 1600px, sem crop).
  for (const file of available) {
    if (consumed.has(file)) continue;
    if (!/\.(jpe?g|png|webp|avif|tiff?)$/i.test(file)) continue;

    const out = file
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const outPath = path.join(OUT_DIR, `${out}.webp`);

    const info = await sharp(path.join(SRC_DIR, file))
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 85, effort: 6 })
      .toFile(outPath);

    const kb = (info.size / 1024).toFixed(1);
    console.log(`[images] (auto) ${file} -> ${outPath} (${info.width}x${info.height}, ${kb} KB)`);
    generated += 1;
  }

  console.log(`[images] ${generated} imagem(ns) gerada(s) em ${OUT_DIR}/`);
}

build().catch((error) => {
  console.error("[images] falhou:", error);
  process.exit(1);
});
