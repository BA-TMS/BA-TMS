'use client';

import Modal from '@ui/Modal/Modal';
import ConsigneeReviewForm from '@/components/Forms/Consignee/ConsigneeReview';

// this is an intercepting route that builds a modal

export default function AddConsigneeReviewModal() {
  return (
    <Modal title={'Add Consignee'}>
      <ConsigneeReviewForm />
    </Modal>
  );
}
