'use client';

import Modal from '@ui/Modal/Modal';
import ConsigneeDetailsForm from '@/components/Forms/Consignee/ConsigneeDetails';

// this is an intercepting route that builds a modal

export default function UpdateConsigneeReviewModal() {
  return (
    <Modal title={'Update Consignee'}>
      <ConsigneeDetailsForm />
    </Modal>
  );
}
