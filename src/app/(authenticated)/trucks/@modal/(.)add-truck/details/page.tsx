'use client';

import Modal from '@ui/Modal/Modal';
import TruckDetails from '@/components/Forms/Truck/TruckDetails';

// this is an intercepting route that builds a modal

export default function AddTruckDetailsModal() {
  return (
    <Modal title={'Add Truck'}>
      <TruckDetails />
    </Modal>
  );
}
