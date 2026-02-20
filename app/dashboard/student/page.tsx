import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export default async function StudentDashboard() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect('/auth/signin');

  const [bookings, favorites, payments, chats] = await Promise.all([
    prisma.booking.findMany({ where: { studentId: session.user.id }, include: { tutor: true, subject: true }, orderBy: { startsAt: 'desc' } }),
    prisma.favorite.findMany({ where: { userId: session.user.id }, include: { tutor: true } }),
    prisma.payment.findMany({ where: { userId: session.user.id }, include: { booking: true } }),
    prisma.message.findMany({ where: { OR: [{ senderId: session.user.id }, { receiverId: session.user.id }] }, take: 20, orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold">Личный кабинет ученика</h1>
      <section><h2 className="font-semibold">Мои занятия ({bookings.length})</h2></section>
      <section><h2 className="font-semibold">Избранное ({favorites.length})</h2></section>
      <section><h2 className="font-semibold">История платежей ({payments.length})</h2></section>
      <section><h2 className="font-semibold">Чат ({chats.length} сообщений)</h2></section>
    </div>
  );
}
