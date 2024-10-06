import type { Metadata } from 'next';
import './globals.scss';
import { Providers } from './Providers';
import { Fira_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Fira_Mono({ subsets: ['cyrillic', 'latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Next Dashboard',
  description: 'Admin dashboard template built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
