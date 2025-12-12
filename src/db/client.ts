import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type AppDb = NeonHttpDatabase<typeof schema>;

declare global
{
  // eslint-disable-next-line no-var
  var __drizzleDb__: AppDb | undefined;
}

function createDatabase ()
{
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export const db = globalThis.__drizzleDb__ ?? createDatabase();
if (!globalThis.__drizzleDb__) {
  globalThis.__drizzleDb__ = db;
}


