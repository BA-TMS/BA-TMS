'use client';

import { useRouter } from 'next/navigation';
import CustomerDetails from '@/components/Forms/Customer/CustomerDetails';

// this is a regular page for /add-customer (not a modal)
// are we seeing this page ever or is it always going to the modal?

export default function AddCustomerDetails() {
  const router = useRouter();
  return (
    <div className="">
      <div className="">
        <h1>Customer </h1>
        <h2>this is add-customer/details not modal</h2>

        <CustomerDetails />
        <button onClick={() => router.back()} className="btn-primary">
          Go Back
        </button>
      </div>
    </div>
  );
}
