'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchInput } from '@/lib/validators/search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const SearchForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SearchInput>({ resolver: zodResolver(searchSchema) });

  const onSubmit = (values: SearchInput) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params.set(key, String(value));
    });
    router.push(`/tutors?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 md:grid-cols-4">
      <Input placeholder="Предмет" {...register('subject')} />
      <Input type="number" placeholder="Цена от" {...register('minPrice')} />
      <Input type="number" placeholder="Рейтинг от 1 до 5" {...register('rating')} />
      <Button type="submit">Найти</Button>
    </form>
  );
};
