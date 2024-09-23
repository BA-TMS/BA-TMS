import { redirect } from 'next/navigation';

// this is an intercepting route
// we shouldn't see this page

export default function AddCustomerModal() {
  return redirect('/customers/add-customer/details');
}
