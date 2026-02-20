import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export default async function TutorDashboard() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect('/auth/signin');

  const profile = await prisma.tutorProfile.findUnique({
    where: { userId: session.user.id },
    include: { availabilities: true, user: { include: { tutorBookings: true } } }
  });

  if (!profile) {
    return <div className="mx-auto max-w-4xl px-4 py-10">Создайте профиль репетитора.</div>;
  }

  const income = profile.user.tutorBookings.length * profile.hourlyRate;

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold">Личный кабинет репетитора</h1>
      <p>Управление профилем, расписанием и стоимостью занятий.</p>
      <div className="rounded-2xl border bg-white p-4">Доход: ${income}</div>
      <div className="rounded-2xl border bg-white p-4">Свободные слоты: {profile.availabilities.filter((a) => !a.isBooked).length}</div>
      <div className="rounded-2xl border bg-white p-4">Заявки: {profile.user.tutorBookings.length}</div>
    </div>
  );
}
