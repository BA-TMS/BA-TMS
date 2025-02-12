'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { ShipperData } from '@/types/shipperTypes';
import ViewShipperForm from '@/components/Forms/Shipper/ViewShipper';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewShipperModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const shipperId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const shipper = useSelector((state: RootState) =>
    state.shippers.items.find(
      (shipper: ShipperData) => shipper.id === shipperId
    )
  );

  return (
    <Modal title={'View Shipper'}>
      <ViewShipperForm data={shipper} />
    </Modal>
  );
}
