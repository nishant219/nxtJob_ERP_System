import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/models/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  driver: 'd1-http',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} as Config;