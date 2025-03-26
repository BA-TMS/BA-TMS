'use client';

import Modal from '@ui/Modal/Modal';
import CarrierForm from '@/components/Forms/Carrier/CarrierForm';

// this is an intercepting route that builds a modal

export default function UpdateCarrierRevieweModal() {
  return (
    <Modal title={'Update External Carrier'}>
      <CarrierForm />
    </Modal>
  );
}
