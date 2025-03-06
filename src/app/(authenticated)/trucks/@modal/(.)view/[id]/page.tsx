'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { TruckData } from '@/types/truckTypes';
import ViewTruckForm from '@/components/Forms/Truck/ViewTruck';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewTruckModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const truckId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const truck = useSelector((state: RootState) =>
    state.trucks.items.find((truck: TruckData) => truck.id === truckId)
  );

  return (
    <Modal title={'View Truck'}>
      <ViewTruckForm data={truck} />
    </Modal>
  );
}
