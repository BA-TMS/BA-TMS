import { redirect } from 'next/navigation';

export default function ViewUser() {
  return redirect('/settings/team');
}
