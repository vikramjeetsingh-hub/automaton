import { build } from "esbuild";
  await build({
    entryPoints: ["./src/gas/gas.entry.ts"],
    bundle: true,
    platform: "browser",
    format: "iife",
    target: "es2019",
    tsconfig: "./tsconfig.json",
    outfile: "build/Code.js",
    logLevel: "info",
    sourcemap: false,
    minify: false,
    footer: {
      js: `function testRun() {
      return globalThis.testRun && globalThis.testRun()
      }`
    }
  }).catch(() => process.exit(1));
