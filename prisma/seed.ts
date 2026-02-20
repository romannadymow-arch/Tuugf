import { PrismaClient, Role, LessonFormat } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const [math, english] = await Promise.all([
    prisma.subject.upsert({ where: { name: 'Математика' }, update: {}, create: { name: 'Математика' } }),
    prisma.subject.upsert({ where: { name: 'Английский' }, update: {}, create: { name: 'Английский' } })
  ]);

  const tutorPassword = await bcrypt.hash('Password123!', 10);
  const tutorUser = await prisma.user.upsert({
    where: { email: 'tutor@example.com' },
    update: {},
    create: { email: 'tutor@example.com', name: 'Анна Смирнова', role: Role.TUTOR, passwordHash: tutorPassword }
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: { email: 'student@example.com', name: 'Иван Петров', role: Role.STUDENT, passwordHash: await bcrypt.hash('Password123!', 10) }
  });

  const profile = await prisma.tutorProfile.upsert({
    where: { userId: tutorUser.id },
    update: {},
    create: {
      userId: tutorUser.id,
      bio: 'Помогаю системно готовиться к ЕГЭ и олимпиадам.',
      city: 'Москва',
      experienceYears: 7,
      education: 'МГУ, прикладная математика',
      hourlyRate: 35,
      lessonFormat: LessonFormat.ONLINE
    }
  });

  await prisma.tutorSubject.upsert({ where: { tutorId_subjectId: { tutorId: profile.id, subjectId: math.id } }, update: {}, create: { tutorId: profile.id, subjectId: math.id } });
  await prisma.tutorSubject.upsert({ where: { tutorId_subjectId: { tutorId: profile.id, subjectId: english.id } }, update: {}, create: { tutorId: profile.id, subjectId: english.id } });

  await prisma.availability.createMany({
    data: [1, 2, 3].map((day) => {
      const startsAt = new Date();
      startsAt.setDate(startsAt.getDate() + day);
      startsAt.setHours(18, 0, 0, 0);
      const endsAt = new Date(startsAt);
      endsAt.setHours(19);
      return { tutorId: profile.id, startsAt, endsAt };
    }),
    skipDuplicates: true
  });

  await prisma.review.upsert({
    where: { studentId_tutorId: { studentId: studentUser.id, tutorId: tutorUser.id } },
    update: {},
    create: { studentId: studentUser.id, tutorId: tutorUser.id, rating: 5, comment: 'Отлично объясняет сложные темы!' }
  });
}

main().finally(async () => prisma.$disconnect());
