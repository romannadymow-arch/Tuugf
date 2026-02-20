import { NextResponse } from 'next/server';
import { LessonFormat } from '@prisma/client';
import { getTutors } from '@/lib/tutors';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tutors = await getTutors({
    subject: searchParams.get('subject') ?? undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
    format: (searchParams.get('format') as LessonFormat | null) ?? undefined,
    city: searchParams.get('city') ?? undefined,
    experienceYears: searchParams.get('experienceYears') ? Number(searchParams.get('experienceYears')) : undefined
  });

  return NextResponse.json(tutors);
}
