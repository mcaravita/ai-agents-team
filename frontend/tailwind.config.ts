import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
        surface: {
          DEFAULT: '#1e293b',
          light: '#334155',
        },
        background: '#0f172a',
        accent: '#10b981',
      },
      keyframes: {
        typing: {
          '0%, 60%, 100%': { opacity: '0.5', transform: 'translateY(0)' },
          '30%': { opacity: '1', transform: 'translateY(-6px)' },
        },
      },
      animation: {
        typing: 'typing 1.4s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
