import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./db/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
  },
  breakpoints: true,
  verbose: true,
  strict: true,
});
