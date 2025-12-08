import { createClient } from "@libsql/client";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __drizzleDb__: LibSQLDatabase<typeof schema> | undefined;
}

function createDatabase() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not set");
  }
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const client = createClient({ url, authToken });
  return drizzle(client, { schema });
}

export const db = globalThis.__drizzleDb__ ?? createDatabase();
if (!globalThis.__drizzleDb__) {
  globalThis.__drizzleDb__ = db;
}


