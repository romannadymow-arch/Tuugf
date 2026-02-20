import Link from 'next/link';
import { SearchForm } from '@/components/forms/search-form';
import { Card } from '@/components/ui/card';
import { Testimonials } from '@/components/home/testimonials';

const categories = ['Английский', 'Математика', 'Физика', 'Программирование'];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-10">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-100 to-teal-100 p-8">
        <h1 className="text-4xl font-bold">Подберите идеального репетитора за 2 минуты</h1>
        <p className="mt-3 text-slate-700">Онлайн и офлайн, проверенные преподаватели, прозрачные отзывы.</p>
        <div className="mt-6"><SearchForm /></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Популярные категории</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((cat) => (
            <Link key={cat} href={`/tutors?subject=${encodeURIComponent(cat)}`} className="rounded-xl border bg-white p-4 text-center shadow-soft">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['Выберите репетитора', 'Забронируйте слот', 'Начните обучение'].map((item, idx) => (
          <Card key={item} className="p-5">
            <div className="text-primary">0{idx + 1}</div>
            <div className="mt-2 font-semibold">{item}</div>
          </Card>
        ))}
      </section>

      <Testimonials />
    </div>
  );
}
