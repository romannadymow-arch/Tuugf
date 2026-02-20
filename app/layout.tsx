import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ToastProvider } from '@/components/ui/toast';

export const metadata: Metadata = {
  title: 'TutorMatch — подбор репетиторов',
  description: 'Маркетплейс репетиторов с фильтрами, отзывами и бронированием занятий.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ToastProvider>
          <Header />
          <main className="min-h-[calc(100vh-140px)]">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
