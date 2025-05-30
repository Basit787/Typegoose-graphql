import type { Context, Next } from "hono";
import { verifyToken } from "../lib/jwt.js";

export const getUserFromAuthHeader = (c: Context, next: Next) => {
  try {
    const headers = c.req.header("Authorization");
    if (!headers) return c.json({ message: "Headers not found!!!" }, 404);

    const token = headers.split(" ")[1];
    if (!token) return c.json({ message: "Token not found" }, 403);

    const verifiedUser = verifyToken(token);
    if (!verifiedUser) return c.json({ message: "Failed to verify token" }, 403);

    next();
  } catch (error) {
    return c.json({ message: "Internal Server error" }, 400);
  }
};
