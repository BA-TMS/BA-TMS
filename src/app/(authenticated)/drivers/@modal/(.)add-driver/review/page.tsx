'use client';

import Modal from '@ui/Modal/Modal';
import DriverReviewForm from '@/components/Forms/Driver/DriverReview';

export default function AddDriverReview() {
  return (
    <Modal title="Add Driver">
      <DriverReviewForm />
    </Modal>
  );
}
