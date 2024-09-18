'use client';

import { useRouter } from 'next/navigation';

export default function TestPageModal() {
  const router = useRouter();
  return (
    <div className="fixed z-999999 top-0 left-0 flex h-full min-h-screen w-full items-start justify-center bg-black/90 px-4 py-5">
      <div className="my-auto w-[694px] h-5/6 overflow-auto rounded-[14.5px] border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900">
        <h1>Customer Modal</h1>
        <h2>this is (.)add-customer</h2>

        <button onClick={() => router.back()} className="btn-primary">
          Close Modal
        </button>
      </div>
    </div>
  );
}
