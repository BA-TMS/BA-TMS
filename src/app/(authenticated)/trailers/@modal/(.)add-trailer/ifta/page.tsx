'use client';

import Modal from '@ui/Modal/Modal';
import TruckIFTAForm from '@/components/Forms/Truck/TruckIFTA';

// this is an intercepting route that builds a modal

export default function AddTruckIFTAModal() {
  return (
    <Modal title={'Add Truck'}>
      <TruckIFTAForm />
    </Modal>
  );
}
