import { z } from 'zod';
export * from './database';

export const LeadStages = {
  NEW_LEAD: 'New Lead',
  NO_RESPONSE: 'No Response',
  IN_PROGRESS: 'In Progress',
  CONVERTED: 'Converted',
  LOST: 'Lost',
} as const;

export const LeadSources = {
  FACEBOOK: 'Facebook',
  LINKEDIN: 'LinkedIn',
  MANUAL: 'Manual',
  OTHER: 'Other',
} as const;

export const createLeadSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().optional(),
  phone: z.string().min(5).max(50).optional(),
  source: z.nativeEnum(LeadSources),
  owner: z.string().min(1),
  notes: z.string().optional(),
});

export const updateLeadStageSchema = z.object({
  stage: z.nativeEnum(LeadStages),
});

export const updateLeadOwnerSchema = z.object({
  owner: z.string().min(1),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadStageInput = z.infer<typeof updateLeadStageSchema>;
export type UpdateLeadOwnerInput = z.infer<typeof updateLeadOwnerSchema>;