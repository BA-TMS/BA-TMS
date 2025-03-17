'use client';

import Modal from '@ui/Modal/Modal';
import OtherNumReview from '@/components/Forms/OtherNumbers/OtherNumbersReview';

// this is an intercepting route that builds a modal

export default function AddNumReviewModal() {
  return (
    <Modal title={'Add Other Number'}>
      <OtherNumReview />
    </Modal>
  );
}
