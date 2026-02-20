import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { bookingSchema } from '@/lib/validators/booking';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = bookingSchema.parse(await req.json());
  const slot = await prisma.availability.findUnique({ where: { id: data.availabilityId }, include: { tutor: true } });
  if (!slot || slot.isBooked) return NextResponse.json({ error: 'Slot unavailable' }, { status: 400 });

  const booking = await prisma.booking.create({
    data: {
      studentId: session.user.id,
      tutorId: slot.tutor.userId,
      subjectId: data.subjectId,
      availabilityId: slot.id,
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
      format: slot.tutor.lessonFormat
    }
  });

  return NextResponse.json(booking, { status: 201 });
}
