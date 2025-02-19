'use client';

import Modal from '@ui/Modal/Modal';
import ConsigneeDetailsForm from '@/components/Forms/Consignee/ConsigneeDetails';

// this is an intercepting route that builds a modal

export default function AddShipperDetailsModal() {
  return (
    <Modal title={'Add Consignee'}>
      <ConsigneeDetailsForm />
    </Modal>
  );
}
