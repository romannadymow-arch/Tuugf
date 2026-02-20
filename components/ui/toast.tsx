'use client';

import * as Toast from '@radix-ui/react-toast';
import { createContext, useContext, useMemo, useState } from 'react';

type ToastData = { title: string; description?: string };

const ToastContext = createContext<{ push: (toast: ToastData) => void }>({ push: () => {} });

export const useAppToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const api = useMemo(() => ({ push: (t: ToastData) => setToast(t) }), []);

  return (
    <Toast.Provider swipeDirection="right">
      <ToastContext.Provider value={api}>{children}</ToastContext.Provider>
      <Toast.Root
        open={Boolean(toast)}
        onOpenChange={(open) => {
          if (!open) setToast(null);
        }}
        className="fixed bottom-4 right-4 z-50 w-96 rounded-xl bg-white p-4 shadow-soft"
      >
        <Toast.Title className="font-semibold">{toast?.title}</Toast.Title>
        <Toast.Description className="text-sm text-slate-600">{toast?.description}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};
