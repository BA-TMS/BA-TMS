import { redirect } from 'next/navigation';

// we shouldn't see this page

export default function AddCarrier() {
  return redirect('/carriers');
}
