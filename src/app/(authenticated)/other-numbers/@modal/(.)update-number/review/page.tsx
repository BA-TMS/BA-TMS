'use client';

import Modal from '@ui/Modal/Modal';
import OtherNumReview from '@/components/Forms/OtherNumbers/OtherNumbersReview';

// this is an intercepting route that builds a modal

export default function UpdateNumReviewModal() {
  return (
    <Modal title={'Update Other Number'}>
      <OtherNumReview />
    </Modal>
  );
}
