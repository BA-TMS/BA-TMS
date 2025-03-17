import { redirect } from 'next/navigation';

// we shouldn't see this page

export default function UpdateNumModal() {
  return redirect('/other-numbers');
}
