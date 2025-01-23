import { redirect } from 'next/navigation';

// we shouldn't see this page

export default function updateBroker() {
  return redirect('/brokers');
}
