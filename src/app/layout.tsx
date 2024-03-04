import './globals.css';

// root layout should not be a client component

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
