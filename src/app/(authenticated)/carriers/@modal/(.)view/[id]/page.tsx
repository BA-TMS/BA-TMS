'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { CarrierData } from '@/types/carrierTypes';
import ViewCarrier from '@/components/Forms/Carrier/ViewCarrier';

// this is an intercepting route that builds a modal
// it uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewCarrierModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const carrierId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const carrier = useSelector((state: RootState) =>
    state.carriers.items.find(
      (carrier: CarrierData) => carrier.id === carrierId
    )
  );

  return (
    <Modal title={'View External Carrier'}>
      <ViewCarrier data={carrier} />
    </Modal>
  );
}
