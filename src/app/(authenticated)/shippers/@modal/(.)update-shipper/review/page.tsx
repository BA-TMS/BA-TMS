'use client';

import Modal from '@ui/Modal/Modal';
import FactoringCompanyReview from '@/components/Forms/Factor/FactoringCoReview';

// this is an intercepting route that builds a modal

export default function UpdateFactorReviewModal() {
  return (
    <Modal title={'Update Factoring Company'}>
      <FactoringCompanyReview />
    </Modal>
  );
}
