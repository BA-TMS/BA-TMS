'use client';

import Modal from '@ui/Modal/Modal';
import CarrierDetails from '@/components/Forms/Carrier/CarrierDetails';

// this is an intercepting route that builds a modal

export default function AddCarrierDetailsModal() {
  return (
    <Modal title={'Add External Carrier'}>
      <CarrierDetails />
    </Modal>
  );
}
