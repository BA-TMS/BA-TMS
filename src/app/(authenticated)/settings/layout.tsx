'use client';

// import Link from 'next/link';
import PageTitle from '@/components/Page/PageTitle';

export default function SettingsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <PageTitle pageTitle="Settings" />
      {children}
      {modal}
    </>
  );
}
