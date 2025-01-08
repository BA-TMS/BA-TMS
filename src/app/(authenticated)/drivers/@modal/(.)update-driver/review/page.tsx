'use client';

import Modal from '@ui/Modal/Modal';
import DriverReviewForm from '@/components/Forms/Driver/DriverReview';

export default function UpdateDriverReviewModal() {
  return (
    <Modal title="Update Driver">
      <DriverReviewForm />
    </Modal>
  );
}
