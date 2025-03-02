import { Hono } from "hono";

export const healthcheckRouter = new Hono().get("/", (c) => c.text("Healthy"));
