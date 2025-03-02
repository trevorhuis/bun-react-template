import { Hono } from "hono";
import { jwtProtected } from "../middleware";

const userRouter = new Hono().get("me", jwtProtected, (c) => {
  const payload = c.get("jwtPayload");
  return c.json({ userId: payload.userId }, 200);
});

export default userRouter;
