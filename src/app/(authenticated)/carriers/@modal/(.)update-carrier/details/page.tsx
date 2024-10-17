'use client';

import Modal from '@ui/Modal/Modal';
import CarrierForm from '@/components/Forms/CarrierForm';

// this is an intercepting route that builds a modal

export default function UpdateCarrierDetailsModal() {
  return (
    <Modal title={'Update External Carrier'}>
      <CarrierForm />
    </Modal>
  );
}
