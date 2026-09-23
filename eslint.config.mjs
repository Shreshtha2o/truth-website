import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // ParticleJourney deliberately mutates Three.js BufferGeometry/uniform objects
  // inside the render loop. React Compiler's immutability rules are not designed
  // for these imperative GPU objects. Keep the frozen engine intact and scope the
  // exception to this file only.
  {
    files: ["src/components/ParticleJourney.tsx"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
