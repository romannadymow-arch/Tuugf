'use client';

import { motion } from 'framer-motion';

const items = [
  { name: 'Мария', text: 'Нашла репетитора за вечер, сын подтянул математику.' },
  { name: 'Илья', text: 'Удобный интерфейс и быстрый подбор по рейтингу.' }
];

export const Testimonials = () => (
  <section>
    <h2 className="mb-4 text-2xl font-semibold">Отзывы</h2>
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border bg-white p-5 shadow-soft"
        >
          <p>{item.text}</p>
          <p className="mt-3 text-sm text-slate-500">— {item.name}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
