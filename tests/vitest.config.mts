import { defineConfig } from "vitest/config";
import viteConfig from "../vitest.config.mjs";


const { plugins } = viteConfig;

export default defineConfig({
  plugins,
  test: {
    globals: true,
    include: ["tests/**/*.spec.ts"],
    exclude: ["src/**"],
  },
});
