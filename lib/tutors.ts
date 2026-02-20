import { Prisma, LessonFormat } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export type TutorFilters = {
  subject?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  format?: LessonFormat;
  experienceYears?: number;
  city?: string;
};

export const getTutors = async (filters: TutorFilters) => {
  const where: Prisma.TutorProfileWhereInput = {
    hourlyRate: { gte: filters.minPrice, lte: filters.maxPrice },
    lessonFormat: filters.format,
    experienceYears: filters.experienceYears ? { gte: filters.experienceYears } : undefined,
    city: filters.city ? { contains: filters.city, mode: 'insensitive' } : undefined,
    subjects: filters.subject
      ? { some: { subject: { name: { contains: filters.subject, mode: 'insensitive' } } } }
      : undefined
  };

  const tutors = await prisma.tutorProfile.findMany({
    where,
    include: {
      user: { include: { receivedReviews: true } },
      subjects: { include: { subject: true } }
    }
  });

  return tutors
    .map((tutor) => {
      const ratings = tutor.user.receivedReviews.map((r) => r.rating);
      const avgRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
      return { ...tutor, avgRating };
    })
    .filter((t) => !filters.rating || t.avgRating >= filters.rating)
    .sort((a, b) => b.avgRating - a.avgRating);
};
