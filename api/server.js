import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import { authRouter } from "./lib/auth/auth.router";
import { healthcheckRouter } from "./lib/healthcheck.router";
import userRouter from "./lib/user/user.router";
import { protectedRouter } from "./lib/protected.router";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app
  .basePath("/api")
  .route("/healthcheck", healthcheckRouter)
  .route("/protected", protectedRouter)
  .route("/user", userRouter)
  .route("/auth", authRouter);

export default {
  port: 3000,
  fetch: app.fetch,
};
