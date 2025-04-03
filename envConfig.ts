import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  DATABASE_URL: z.string().url().default('file:./dev.db'),
  AUTH_NUXT_SECRET: z.string().nonempty().min(16).default('yiho-concrete-sam'),
  AUTH_ORIGIN: z.string().url().default("http://localhost:3000"),
});

const parsedSchema = envSchema.safeParse(process.env);
if (parsedSchema.success === false) {
  console.error(
    "😔 Your env is invalid!",
    parsedSchema.error.flatten().fieldErrors
  );
  throw new Error("😔 Your env is invalid!");
}

export const envConfig = parsedSchema.data;