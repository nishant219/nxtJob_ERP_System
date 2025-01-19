// import { drizzle } from 'drizzle-orm/neon-serverless';
// import { Pool } from '@neondatabase/serverless';
// import * as schema from '../models/schema';
// import { DrizzleClient } from '../types';

// export const createDbClient = (connectionString: string): DrizzleClient => {
//   const pool = new Pool({ connectionString });
//   return drizzle(pool, { schema });
// };


import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from '../models/schema';
import { DrizzleClient } from '../types';

export const createDbClient = (connectionString: string): DrizzleClient => {
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  try {
    const pool = new Pool({ connectionString });
    return drizzle(pool, { schema });
  } catch (error) {
    console.error('Error creating database client:', error);
    throw new Error('Failed to initialize database connection');
  }
};