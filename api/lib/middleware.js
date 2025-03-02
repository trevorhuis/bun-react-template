import { jwt } from "hono/jwt";

export const jwtProtected = jwt({
  secret: Bun.env.SECRET,
  cookie: "token",
});
