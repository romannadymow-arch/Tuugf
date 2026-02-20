import { z } from 'zod';

export const bookingSchema = z.object({
  tutorId: z.string().cuid(),
  subjectId: z.string().cuid(),
  availabilityId: z.string().cuid(),
  note: z.string().max(400).optional()
});

export type BookingInput = z.infer<typeof bookingSchema>;
