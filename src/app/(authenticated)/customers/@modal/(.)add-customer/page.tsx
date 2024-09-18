'use client';

// import { useRouter } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import CustomerDetails from '@/components/Forms/Customer/CustomerDetails';

// this is an intercepting route that builds a modal

export default function AddCustomerModal() {
  // const router = useRouter();
  return (
    <Modal title={'Add Customer'}>
      <CustomerDetails />
    </Modal>
  );
}
