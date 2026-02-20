import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => (
  <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <GraduationCap className="h-5 w-5 text-primary" /> TutorMatch
      </Link>
      <nav className="flex items-center gap-3">
        <Link href="/tutors" className="text-sm text-slate-600 hover:text-slate-900">Каталог</Link>
        <Link href="/dashboard/student" className="text-sm text-slate-600 hover:text-slate-900">Кабинет</Link>
        <Link href="/auth/signin"><Button>Войти</Button></Link>
      </nav>
    </div>
  </header>
);
