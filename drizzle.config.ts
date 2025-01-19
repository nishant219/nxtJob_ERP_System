import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/models/schema.ts',
  out: './drizzle',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CF_ACCOUNT_ID!,
    databaseId: process.env.CF_DATABASE_ID!,
    token: process.env.CF_API_TOKEN!
  },
} as unknown as Config;
