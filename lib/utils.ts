import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const sanitizeText = (value: string) =>
  value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim();
