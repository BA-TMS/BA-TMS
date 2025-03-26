import { redirect } from 'next/navigation';

// we shouldn't see this page

export default function AddTruckModal() {
  return redirect('/trucks');
}
