'use client';

import Modal from '@ui/Modal/Modal';
import TruckReview from '@/components/Forms/Truck/TruckReview';

// this is an intercepting route that builds a modal

export default function UpdateTruckReviewModal() {
  return (
    <Modal title={'Update Truck'}>
      <TruckReview />
    </Modal>
  );
}
