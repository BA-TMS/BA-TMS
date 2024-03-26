import './globals.css';

import { Public_Sans } from 'next/font/google';

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-publicsans',
});
// create a variable to reference through tailwind classes

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
