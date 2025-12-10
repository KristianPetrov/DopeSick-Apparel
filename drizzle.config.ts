import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load both .env.local (Next.js convention) and .env if present
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    token: process.env.TURSO_AUTH_TOKEN,
  },
  strict: true,
  verbose: true,
});


