'use client';

import Modal from '@ui/Modal/Modal';
import CarrierForm from '@/components/Forms/CarrierForm';

// this is an intercepting route that builds a modal

export default function AddCarrierDetailsModal() {
  return (
    <Modal title={'Add External Carrier'}>
      <CarrierForm />
    </Modal>
  );
}
