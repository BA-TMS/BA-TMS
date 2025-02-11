'use client';

import Modal from '@ui/Modal/Modal';
import ShipperDetailsForm from '@/components/Forms/Shipper/ShipperDetails';

// this is an intercepting route that builds a modal

export default function AddShipperDetailsModal() {
  return (
    <Modal title={'Add Shipper'}>
      <ShipperDetailsForm />
    </Modal>
  );
}
