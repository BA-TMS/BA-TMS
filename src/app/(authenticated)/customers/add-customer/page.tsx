'use client';

import { useRouter } from 'next/navigation';

// this is a regular page for /add-customer (not a modal)

export default function AddCustomer() {
  const router = useRouter();
  return (
    <div className="">
      <div className="">
        <h1>Customer </h1>
        <h2>this is (.)add-customer not modal</h2>

        <button onClick={() => router.back()} className="btn-primary">
          Go Back
        </button>
      </div>
    </div>
  );
}
