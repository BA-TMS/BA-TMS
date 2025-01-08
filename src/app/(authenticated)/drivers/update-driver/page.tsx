import { redirect } from 'next/navigation';

// we shouldn't see this page
// this is currently not working

export default function UpdateDriver() {
  return redirect('/drivers');
}
