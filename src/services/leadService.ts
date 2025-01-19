import { eq, like, and, desc, sql } from 'drizzle-orm';
import { DrizzleClient } from '../types';
import { leads, Lead, NewLead } from '../models/schema';
import { CreateLeadInput, UpdateLeadStageInput, UpdateLeadOwnerInput } from '../types';

export class LeadService {
  constructor(private db: DrizzleClient) {}

  async createLead(data: CreateLeadInput): Promise<Lead> {
    const [lead] = await this.db.insert(leads).values(data).returning();
    return lead;
  }

  async getLeads(params: {
    page?: number;
    limit?: number;
    source?: string;
    owner?: string;
    query?: string;
  }): Promise<{ leads: Lead[]; count: number; totalPages: number }> {
    const { page = 1, limit = 20, source, owner, query } = params;
    const offset = (page - 1) * limit;

    let conditions = [];
    if (source) conditions.push(eq(leads.source, source));
    if (owner) conditions.push(eq(leads.owner, owner));
    if (query) conditions.push(like(leads.name, `%${query}%`));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Define the type for the count query result
    type CountResult = { count: number };

    const [leadsData, countResult] = await Promise.all([
      this.db.select().from(leads)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(leads.createdAt)),
      this.db.select({ 
        count: sql<number>`cast(count(*) as integer)`
      })
        .from(leads)
        .where(whereClause)
    ]);

    const count = (countResult[0] as CountResult).count;

    return {
      leads: leadsData,
      count,
      totalPages: Math.ceil(count / limit)
    };
  }

  async updateLeadStage(id: number, data: UpdateLeadStageInput): Promise<Lead> {
    const [lead] = await this.db
      .update(leads)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return lead;
  }

  async updateLeadOwner(id: number, data: UpdateLeadOwnerInput): Promise<Lead> {
    const [lead] = await this.db
      .update(leads)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return lead;
  }
}