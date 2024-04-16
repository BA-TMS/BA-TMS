import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TailAdmin | E-commerce Dashboard Template',
  description: 'This is Home for TailAdmin',
  // other metadata
};

import { Public_Sans } from 'next/font/google';

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-publicsans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${publicSans.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
