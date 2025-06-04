import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NhostProvider } from '@/components/providers/nhost-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Liman Design',
  description: 'Modern ve şık mobilya tasarımları',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <QueryProvider>
          <NhostProvider>
            {children}
            <Toaster />
          </NhostProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
