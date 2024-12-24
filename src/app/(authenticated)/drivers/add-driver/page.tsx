import { redirect } from 'next/navigation';

// we shouldn't see this page

export default function AddDriver() {
  return redirect('/drivers');
}
