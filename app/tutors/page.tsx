import { LessonFormat } from '@prisma/client';
import { getTutors } from '@/lib/tutors';
import { TutorCard } from '@/components/tutors/tutor-card';

export default async function TutorsPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const tutors = await getTutors({
    subject: searchParams.subject,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    rating: searchParams.rating ? Number(searchParams.rating) : undefined,
    format: searchParams.format as LessonFormat | undefined,
    city: searchParams.city,
    experienceYears: searchParams.experienceYears ? Number(searchParams.experienceYears) : undefined
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Каталог репетиторов</h1>
      <div className="space-y-4">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}
