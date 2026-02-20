import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({ tutorId: z.string().cuid(), studentId: z.string().cuid(), rating: z.number().min(1).max(5), comment: z.string().min(5).max(500) });

export async function POST(req: Request) {
  const data = schema.parse(await req.json());
  const review = await prisma.review.upsert({
    where: { studentId_tutorId: { studentId: data.studentId, tutorId: data.tutorId } },
    update: { rating: data.rating, comment: data.comment },
    create: data
  });
  return NextResponse.json(review, { status: 201 });
}
