import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Hosted Postgres connection string (Supabase/Neon). Used by the Prisma
    // CLI for migrate/db push; the runtime client connects via the pg adapter.
    url: process.env.DATABASE_URL ?? "",
  },
});
