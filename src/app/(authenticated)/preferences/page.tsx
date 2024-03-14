'use client'

import { redirect, usePathname } from 'next/navigation';

export default () => redirect(`${usePathname()}/account`);
