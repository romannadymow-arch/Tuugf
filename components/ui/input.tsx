import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn('flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm', className)}
      {...props}
    />
  )
);
Input.displayName = 'Input';
