'use client';

import Modal from '@ui/Modal/Modal';
import FactoringCompanyReview from '@/components/Forms/Factor/FactoringCoReview';

// this is an intercepting route that builds a modal

export default function AddFactorReviewModal() {
  return (
    <Modal title={'Add Factoring Company'}>
      <FactoringCompanyReview />
    </Modal>
  );
}
