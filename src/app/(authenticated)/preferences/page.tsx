'use client';

import { redirect, usePathname } from 'next/navigation';

const PreferencesPage = () => {
  redirect(`${usePathname()}/account`);
};

export default PreferencesPage;
