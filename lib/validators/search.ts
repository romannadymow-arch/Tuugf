import { z } from 'zod';

export const searchSchema = z.object({
  subject: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  format: z.enum(['ONLINE', 'OFFLINE']).optional(),
  city: z.string().optional()
});

export type SearchInput = z.infer<typeof searchSchema>;
