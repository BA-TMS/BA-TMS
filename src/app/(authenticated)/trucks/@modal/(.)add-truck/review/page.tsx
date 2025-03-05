'use client';

import Modal from '@ui/Modal/Modal';
import TruckReview from '@/components/Forms/Truck/TruckReview';

// this is an intercepting route that builds a modal

export default function AddTruckReviewModal() {
  return (
    <Modal title={'Add Truck'}>
      <TruckReview />
    </Modal>
  );
}
