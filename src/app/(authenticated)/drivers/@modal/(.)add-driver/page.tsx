import { redirect } from 'next/navigation';

// we shouldn't see this page
// not working as expected

export default function AddDriverModal() {
  return redirect('/drivers');
}
