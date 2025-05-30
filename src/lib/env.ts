import "dotenv/config";

const { PORT, DATABASE_URL, SECRET_KEY } = process?.env;

const ENV = {
  PORT: parseInt(PORT!) ?? 3000,
  DB_URL: (DATABASE_URL! as string) ?? "",
  SECRET_KEY: (SECRET_KEY! as string) ?? "",
} as const;

export default ENV;

export type ENVType = typeof ENV;
