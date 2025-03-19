'use client';

import Modal from '@ui/Modal/Modal';
import TrailerReview from '@/components/Forms/Trailer/TrailerReview';

// this is an intercepting route that builds a modal

export default function UpdateTrailerReviewModal() {
  return (
    <Modal title={'Update Trailer'}>
      <TrailerReview />
    </Modal>
  );
}
