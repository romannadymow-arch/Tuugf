import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { createBookingAction } from '@/lib/actions/bookings';

export default async function TutorProfilePage({ params }: { params: { id: string } }) {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: params.id },
    include: {
      user: { include: { receivedReviews: true } },
      subjects: { include: { subject: true } },
      availabilities: { where: { isBooked: false, startsAt: { gte: new Date() } }, take: 5, orderBy: { startsAt: 'asc' } }
    }
  });

  if (!tutor) notFound();
  const avg = tutor.user.receivedReviews.length
    ? tutor.user.receivedReviews.reduce((sum, r) => sum + r.rating, 0) / tutor.user.receivedReviews.length
    : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row">
          <Image src={tutor.user.image ?? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300'} alt={tutor.user.name ?? 'Tutor'} width={140} height={140} className="rounded-2xl object-cover" />
          <div>
            <h1 className="text-3xl font-bold">{tutor.user.name}</h1>
            <p className="text-slate-600">{tutor.bio}</p>
            <p className="mt-2">Предметы: {tutor.subjects.map((s) => s.subject.name).join(', ')}</p>
            <p>Образование: {tutor.education}</p>
            <p>Рейтинг: ★ {avg.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <form action={createBookingAction} className="mt-6 space-y-3 rounded-2xl border bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold">Записаться на занятие</h2>
        <input type="hidden" name="tutorId" value={tutor.id} />
        <input type="hidden" name="subjectId" value={tutor.subjects[0]?.subjectId} />
        <select name="availabilityId" className="w-full rounded-xl border p-2" required>
          {tutor.availabilities.map((slot) => (
            <option key={slot.id} value={slot.id}>{format(slot.startsAt, 'dd.MM HH:mm')} - {format(slot.endsAt, 'HH:mm')}</option>
          ))}
        </select>
        <textarea name="note" placeholder="Цель занятия" className="w-full rounded-xl border p-2" />
        <Button type="submit">Записаться на занятие</Button>
      </form>
    </div>
  );
}
