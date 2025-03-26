'use client';

import Modal from '@ui/Modal/Modal';
import ShipperReviewForm from '@/components/Forms/Shipper/ShipperReview';

// this is an intercepting route that builds a modal

export default function UpdateShipperReviewModal() {
  return (
    <Modal title={'Update Shipper'}>
      <ShipperReviewForm />
    </Modal>
  );
}
