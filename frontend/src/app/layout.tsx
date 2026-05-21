import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Agents Team',
  description: 'Interact with a team of intelligent AI agents for portfolio websites.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
