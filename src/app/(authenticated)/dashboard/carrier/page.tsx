// For example purposes only to quickly test the componets

'use client';

import { ContextProvider } from '@/Context/modalContext';
import Breadcrumbs from '@/components/Header/Breadcrumbs';
import Carriers from '@/components/Table/Carriers';

export default function CarrierPage() {
  return (
    <ContextProvider>
      <div className="px-10 py-11.5 bg-grey-100 dark:bg-grey-800">
        <h1 className='pagetitle'>Available Carriers</h1>
        <Breadcrumbs
          className="py-2 text-grey-600 dark:text-grey-300"
          root="Home"
          separator={<p className="mx-2">&#8226;</p>}
          pathComponentClassName="hover:underline"
          capitalizePathComponents
        />
        <Carriers />
      </div>
    </ContextProvider>
  );
}
