import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createDbClient } from './config/database';
import { LeadService } from './services/leadService';
import { LeadController } from './controllers/leadController';
import { leads } from './models/schema';
import { sql } from 'drizzle-orm';

interface Env {
  DATABASE_URL: string;
}

interface CustomContext {
  leadController: LeadController;
}

const app = new Hono<{ Bindings: Env; Variables: CustomContext }>();

// Middleware
app.use('/*', cors());

// Initialize services and controllers
app.use('/*', async (c, next) => {
  try {
    if (!c.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const db = createDbClient(c.env.DATABASE_URL);
    const leadService = new LeadService(db);
    c.set('leadController', new LeadController(leadService));
    await next();
  } catch (error) {
    console.error('Middleware error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Health check
app.get('/health', async (c) => {
  try {
    const db = createDbClient(c.env.DATABASE_URL);
    await db.execute(sql`SELECT 1`);
    return c.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    console.error('Health check failed:', error);
    return c.json({ status: 'unhealthy', error: 'Database connection failed' }, 500);
  }
});

// Routes
app.get('/', (c) => c.json({ message: 'API is running' }));
app.get('/leads', (c) => c.get('leadController').getLeads(c));
app.post('/leads', (c) => c.get('leadController').createLead(c));
app.patch('/leads/:leadId/stage', (c) => c.get('leadController').updateLeadStage(c));
app.patch('/leads/:leadId/owner', (c) => c.get('leadController').updateLeadOwner(c));

export default app;