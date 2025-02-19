'use client';

import Modal from '@ui/Modal/Modal';
import ShipperDetailsForm from '@/components/Forms/Shipper/ShipperDetails';

// this is an intercepting route that builds a modal

export default function UpdateShipperDetailsModal() {
  return (
    <Modal title={'Update Shipper'}>
      <ShipperDetailsForm />
    </Modal>
  );
}
