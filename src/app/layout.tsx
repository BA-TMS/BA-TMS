import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TailAdmin | E-commerce Dashboard Template',
  description: 'This is Home for TailAdmin',
  // other metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="bg-white text-black dark:bg-boxdark-2 dark:text-bodydark">
        <main>{children}</main>
      </body>
    </html>
  );
}
