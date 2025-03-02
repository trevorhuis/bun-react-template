import { Hono } from "hono";
import { jwtProtected } from "./middleware";

export const protectedRouter = new Hono()
  .use("*", jwtProtected)
  .get("/", (c) => c.json({ message: "You found me!" }));
