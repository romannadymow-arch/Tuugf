import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        foreground: '#111827',
        primary: '#6366F1',
        accent: '#14B8A6',
        muted: '#E5E7EB'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 12px 35px -20px rgba(15, 23, 42, 0.45)'
      }
    }
  },
  plugins: []
};

export default config;
