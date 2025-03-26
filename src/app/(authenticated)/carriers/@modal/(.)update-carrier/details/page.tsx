'use client';

import Modal from '@ui/Modal/Modal';
import CarrierDetails from '@/components/Forms/Carrier/CarrierDetails';

// this is an intercepting route that builds a modal

export default function UpdateCarrierDetailsModal() {
  return (
    <Modal title={'Update External Carrier'}>
      <CarrierDetails />
    </Modal>
  );
}
