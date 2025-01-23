'use client';

import Modal from '@ui/Modal/Modal';
import CustomsBrokerReview from '@/components/Forms/CustomsBroker/CustomsBrokerReview';

// this is an intercepting route that builds a modal

export default function UpdateBrokerReviewModal() {
  return (
    <Modal title={'Update Customs Broker'}>
      <CustomsBrokerReview />
    </Modal>
  );
}
