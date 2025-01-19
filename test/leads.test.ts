// src/test/leads.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import  app  from '../src/index';
import { createDbClient } from '../src/config/database';

describe('Lead Management API', () => {
  const testLead = {
    name: 'Test Lead',
    email: 'test@example.com',
    source: 'Facebook',
    owner: '1234',
  };

  let leadId: number;

  // Test creating a new lead
  it('should create a new lead', async () => {
    const response = await app.request('/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testLead),
    });

    expect(response.status).toBe(201);
    const data:any = await response.json();
    expect(data.name).toBe(testLead.name);
    leadId = data.id;
  });

  // Test getting leads
  it('should fetch leads with pagination', async () => {
    const response = await app.request('/leads?page=1&limit=10');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('leads');
    expect(data).toHaveProperty('count');
    expect(data).toHaveProperty('totalPages');
  });

  // Test updating lead stage
  it('should update lead stage', async () => {
    const response = await app.request(`/leads/${leadId}/stage`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: 'In Progress' }),
    });

    expect(response.status).toBe(200);
    const data:any = await response.json();
    expect(data.stage).toBe('In Progress');
  });

  // Test searching leads
  it('should search leads by name', async () => {
    const response = await app.request(`/leads?query=${testLead.name}`);
    expect(response.status).toBe(200);
    const data:any = await response.json();
    expect(data.leads.length).toBeGreaterThan(0);
  });

  // Test filtering leads
  it('should filter leads by source', async () => {
    const response = await app.request(`/leads?source=Facebook`);
    expect(response.status).toBe(200);
    const data:any = await response.json();
    expect(data.leads.length).toBeGreaterThan(0);
  });
});