import { Context } from 'hono';
import { LeadService } from '../services/leadService';
import { createLeadSchema, updateLeadStageSchema, updateLeadOwnerSchema } from '../types';

export class LeadController {
  constructor(private leadService: LeadService) {}

  async getLeads(c: Context) {
    try {
      const { page, limit, source, owner, query } = c.req.query();
      const result = await this.leadService.getLeads({
        page: page ? parseInt(page) : undefined,
        limit: limit ? parseInt(limit) : undefined,
        source,
        owner,
        query
      });
      return c.json(result);
    } catch (error) {
      console.error('Error fetching leads:', error);
      return c.json({ error: 'Failed to fetch leads' }, 500);
    }
  }

  async createLead(c: Context) {
    try {
      const body = await c.req.json();
      console.log('body:', body);
      const validatedData = createLeadSchema.parse(body);
      console.log('validatedData:', validatedData);
      const lead = await this.leadService.createLead(validatedData);
      console.log('lead:', lead);
      return c.json(lead, 201);
    } catch (error : any) {
      if (error.name === 'ZodError') {
        return c.json({ error: error.errors }, 400);
      }
      console.error('Error creating lead:', error);
      return c.json({ error: 'Failed to create lead' }, 500);
    }
  }

  async updateLeadStage(c: Context) {
    try {
      const id = parseInt(c.req.param('leadId'));
      const body = await c.req.json();
      const validatedData = updateLeadStageSchema.parse(body);
      const lead = await this.leadService.updateLeadStage(id, validatedData);
      return c.json(lead);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return c.json({ error: error.errors }, 400);
      }
      console.error('Error updating lead stage:', error);
      return c.json({ error: 'Failed to update lead stage' }, 500);
    }
  }

  async updateLeadOwner(c: Context) {
    try {
      const id = parseInt(c.req.param('leadId'));
      const body = await c.req.json();
      const validatedData = updateLeadOwnerSchema.parse(body);
      const lead = await this.leadService.updateLeadOwner(id, validatedData);
      return c.json(lead);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return c.json({ error: error.errors }, 400);
      }
      console.error('Error updating lead owner:', error);
      return c.json({ error: 'Failed to update lead owner' }, 500);
    }
  }
}