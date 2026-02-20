# TutorMatch

Production-ready маркетплейс репетиторов на Next.js 14 + Prisma + PostgreSQL.

## Что реализовано
- App Router + TypeScript + Tailwind + UI-компоненты shadcn-стиля.
- Роли: STUDENT / TUTOR / ADMIN.
- SSR-страницы: главная, каталог, профиль репетитора, кабинеты ученика и репетитора.
- Поиск и фильтры через Prisma.
- NextAuth (Google + Credentials).
- API routes: tutors, bookings, reviews, upload (Cloudinary), stripe checkout (mock fallback).
- Server Action для бронирования.
- Middleware защита dashboard и booking API.
- Валидация через Zod + RHF.
- Примеры seed-данных.

## Запуск
1. Установите зависимости:
   ```bash
   npm install
   ```
2. Скопируйте env:
   ```bash
   cp .env.example .env
   ```
3. Поднимите PostgreSQL и выполните:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```
4. Старт:
   ```bash
   npm run dev
   ```

## Тестовый вход
- tutor@example.com / Password123!
- student@example.com / Password123!
