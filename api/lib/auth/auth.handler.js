import { HTTPException } from "hono/http-exception";
import { deleteCookie, setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import Dayjs from "dayjs";

import { createUser, getUserByEmail, verifyLogin } from "../user/user.model";

export const registerHandler = async (c) => {
  const { username, email, password } = await c.req.json();

  const userFound = await getUserByEmail(email);

  if (userFound) {
    c.status(400);
    return c.json({
      errors: {
        email: "A user already exists with this email",
      },
    });
  }

  const userInsert = {
    username,
    email,
  };

  const user = await createUser(userInsert, password);

  if (!user) {
    c.status(500);
    return c.json({
      errors: {
        email: "Failed to create a new user",
        password: null,
      },
    });
  }

  const token = await createToken(user.userId, email);

  setCookie(c, "token", token, {
    path: "/",
    secure: false,
    httpOnly: true,
    maxAge: 100000,
    expires: Dayjs().add(4, "hour").toDate(),
    sameSite: "Lax",
  });

  return c.json({
    message: "Logged In",
  });
};

export const loginHandler = async (c) => {
  const { email, password } = await c.req.json();

  const user = await verifyLogin(email, password);

  console.log("user", user);

  if (!user) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }

  const token = await createToken(user.id, email);

  setCookie(c, "token", token, {
    path: "/",
    secure: false,
    httpOnly: true,
    maxAge: 100000,
    expires: Dayjs().add(4, "hour").toDate(),
    sameSite: "Lax",
  });

  return c.json({
    message: "Logged In",
  });
};

export const logoutHandler = async (c) => {
  deleteCookie(c, "token");
  return c.json({ success: true });
};

const createToken = async (userId, email) => {
  const payload = {
    userId,
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const token = await sign(payload, Bun.env.SECRET || "");
  return token;
};
