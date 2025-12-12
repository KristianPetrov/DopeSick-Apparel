import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load both .env.local (Next.js convention) and .env if present
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});


