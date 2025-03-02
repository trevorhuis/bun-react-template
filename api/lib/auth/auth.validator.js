import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
