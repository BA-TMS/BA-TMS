'use client';

import Modal from '@ui/Modal/Modal';
import CarrierInsuranceForm from '@/components/Forms/Carrier/CarrierInsurance';

// this is an intercepting route that builds a modal

export default function AddCarrierInsuranceModal() {
  return (
    <Modal title={'Add External Carrier'}>
      <CarrierInsuranceForm />
    </Modal>
  );
}
