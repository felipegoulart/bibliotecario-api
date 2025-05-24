import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["fastify", "@prisma/client", "zod", "ulid", "http-status-codes"],
});
