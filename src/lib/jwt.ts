import ENV from "./env.js";
import jwt from "jsonwebtoken";

export const signToken = (payload: object) => {
  return jwt.sign(payload, ENV.SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, ENV.SECRET_KEY);
};
