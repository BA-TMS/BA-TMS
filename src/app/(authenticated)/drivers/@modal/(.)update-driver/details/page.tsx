'use client';

import Modal from '@ui/Modal/Modal';
import DriverForm from '@/components/Forms/Driver/DriverDetails';

// this is an intercepting route that builds a modal

export default function UpdateDriverDetailsModal() {
  return (
    <Modal title={'Update Driver'}>
      <DriverForm />
    </Modal>
  );
}
