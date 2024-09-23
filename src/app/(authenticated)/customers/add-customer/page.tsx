import { redirect } from 'next/navigation';

// we shouldn't see this page

export default function AddCustomerModal() {
  return redirect('/customers/add-customer/details');
}
