'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-4 text-2xl font-bold">Вход</h1>
      <div className="space-y-3 rounded-2xl border bg-white p-6">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
        <Button onClick={() => signIn('credentials', { email, password, callbackUrl: '/dashboard/student' })}>Войти по Email</Button>
        <Button variant="outline" onClick={() => signIn('google', { callbackUrl: '/dashboard/student' })}>Войти через Google</Button>
      </div>
    </div>
  );
}
