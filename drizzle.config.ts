// import type { Config } from 'drizzle-kit';
// import dotenv from 'dotenv';
// dotenv.config();

// export default {
//   schema: './src/models/schema.ts',
//   out: './drizzle',
//   driver: 'd1-http', 
//   dialect: 'postgresql',
//   dbCredentials: {
//     accountId: process.env.CF_ACCOUNT_ID!,
//     databaseId: process.env.CF_DATABASE_ID!,
//     token: process.env.CF_API_TOKEN!
//   },
// } as unknown as Config;



import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/models/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', 
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} as Config;
