import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    /**
     * `components/ui/` guarda os componentes da Aceternity instalados pelo
     * registry, mantidos o mais proximo possivel do codigo publicado na doc.
     * Duas regras sao afrouxadas so aqui:
     *  - `no-explicit-any`: o codigo original usa `any` em props de MotionValue;
     *  - `no-img-element`: o Chromatic Image precisa de um <img> cru como
     *    fallback e como fonte da textura WebGL (next/image nao expoe o bitmap).
     */
    files: ["components/ui/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "scripts/**"],
  },
];

export default eslintConfig;
