import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Tutor = {
  id: string;
  user: { name: string | null; image: string | null };
  subjects: { subject: { name: string } }[];
  experienceYears: number;
  hourlyRate: number;
  avgRating: number;
};

export const TutorCard = ({ tutor }: { tutor: Tutor }) => (
  <Card className="p-4">
    <div className="flex gap-4">
      <Image src={tutor.user.image ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300'} alt={tutor.user.name ?? 'Tutor'} width={84} height={84} className="rounded-xl object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold">{tutor.user.name}</h3>
        <p className="text-sm text-slate-600">{tutor.subjects.map((s) => s.subject.name).join(', ')}</p>
        <p className="mt-1 text-sm">Опыт: {tutor.experienceYears} лет • ${tutor.hourlyRate}/час</p>
        <p className="text-sm text-amber-500">★ {tutor.avgRating.toFixed(1)}</p>
      </div>
      <Link href={`/tutors/`}><Button>Подробнее</Button></Link>
    </div>
  </Card>
);
