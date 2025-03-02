import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { RegisterSchema, LoginSchema } from "./auth.validator";
import { registerHandler, loginHandler, logoutHandler } from "./auth.handler";

export const authRouter = new Hono()
  .post("/register", zValidator("json", RegisterSchema), registerHandler)
  .post("/login", zValidator("json", LoginSchema), loginHandler)
  .get("/logout", logoutHandler);
