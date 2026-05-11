import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Yashashvi Chauhan',
  description: 'A Netflix-style resume for Yashashvi Chauhan built with Next.js and TypeScript.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg'
  },
  openGraph: {
    title: 'Yashashvi Chauhan',
    description: 'A Netflix-style resume for Yashashvi Chauhan built with Next.js and TypeScript.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yashashvi Chauhan',
    description: 'A Netflix-style resume for Yashashvi Chauhan built with Next.js and TypeScript.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}