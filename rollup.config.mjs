// rollup.config.mjs
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { defineConfig } from "rollup";

const config = defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "es",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
      }),
      // Replace the css plugin with postcss for better CSS handling
      postcss({
        // Don't use CSS modules - we want global styles for the animation
        modules: false,
        // Extract to a separate file
        extract: "index.css",
        // Inject false means don't inject into JS
        inject: false,
        // Minimize the CSS
        minimize: true,
        // Generate source maps
        sourceMap: true,
      }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
]);

export default config;
