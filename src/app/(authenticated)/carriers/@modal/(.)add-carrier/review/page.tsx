'use client';

import Modal from '@ui/Modal/Modal';
import CarrierForm from '@/components/Forms/Carrier/CarrierForm';

// this is an intercepting route that builds a modal

export default function AddCarrierRevieweModal() {
  return (
    <Modal title={'Add External Carrier'}>
      <CarrierForm />
    </Modal>
  );
}
