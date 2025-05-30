import mongoose from "mongoose";
import ENV from "../lib/env.js";

export const connectDB = async (callback: (message: boolean) => void) => {
  try {
    await mongoose.connect(ENV.DB_URL);
    callback(true);
  } catch (error) {
    throw new Error("MongoDB connection error:", error as Error);
  }
};
