'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import { RootState } from '@/store/store';
import { DriverData } from '@/types/driverTypes';
import ViewDriver from '@/components/Forms/Driver/ViewDriver';

// this is an intercepting route that builds a modal
// it uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewDriverModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const driverId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const driver = useSelector((state: RootState) =>
    state.drivers.items.find((driver: DriverData) => driver.id === driverId)
  );

  return (
    <Modal title={'View Driver'}>
      <ViewDriver data={driver} />
    </Modal>
  );
}
