import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Fall back to a local SQLite file so `prisma generate` works on Vercel
    // even when DATABASE_URL is not set in the build environment.
    url:
      process.env.DATABASE_URL ??
      `file:${path.join(process.cwd(), "prisma", "dev.db")}`,
  },
});
