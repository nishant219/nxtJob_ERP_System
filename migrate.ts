import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { Pool } from '@neondatabase/serverless';
import * as schema from './src/models/schema';

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool, { schema });
    
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed successfully');
    
    await pool.end();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();