'use server';

import { revalidatePath } from 'next/cache';
import { BookingStatus } from '@prisma/client';
import { getAuthSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validators/booking';
import { sanitizeText } from '@/lib/utils';

export const createBookingAction = async (formData: FormData) => {
  const session = await getAuthSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const payload = bookingSchema.parse({
    tutorId: formData.get('tutorId'),
    subjectId: formData.get('subjectId'),
    availabilityId: formData.get('availabilityId'),
    note: formData.get('note')
  });

  const slot = await prisma.availability.findUnique({ where: { id: payload.availabilityId }, include: { tutor: true } });
  if (!slot || slot.isBooked) throw new Error('Slot unavailable');

  await prisma.booking.create({
    data: {
      studentId: session.user.id,
      tutorId: slot.tutor.userId,
      subjectId: payload.subjectId,
      availabilityId: payload.availabilityId,
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
      status: BookingStatus.PENDING,
      format: slot.tutor.lessonFormat,
      note: payload.note ? sanitizeText(payload.note) : undefined
    }
  });

  await prisma.availability.update({ where: { id: slot.id }, data: { isBooked: true } });
  revalidatePath('/dashboard/student');
};
