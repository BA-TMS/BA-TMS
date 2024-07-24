'use client';

import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '@/Context/modalContext';
import CarrierForm from '../Forms/CarrierForm';
import FormModal from '@/components/Modals/FormModal';
import Table from '../UI_Elements/Table/Table';
import Button from '../UI_Elements/buttons/Button';
import { fetchCarriers } from '@/store/slices/carrierSlice';
import { AppDispatch, RootState } from '@/store/store';

type Carrier = {
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
  dotId: string;
  factorId: string | null;
  taxId: string;
};

// this is passed to Table
const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'address', headerName: 'Address' },
  { field: 'addressAddOn', headerName: 'Address Line 2' },
  { field: 'city', headerName: 'City' },
  { field: 'state', headerName: 'State' },
  { field: 'postCountry', headerName: 'Country' },
  { field: 'postCode', headerName: 'Postal Code/ Zip' },
  { field: 'telCountry', headerName: 'Country Code' },
  { field: 'telephone', headerName: 'Phone Number' },
  { field: 'dotId', headerName: 'DOT ID' },
  { field: 'factorId', headerName: 'Factor ID' },
  { field: 'taxId', headerName: 'Tax ID' },
];

export default function Carriers() {
  const dispatch = useDispatch<AppDispatch>();
  const { toggleOpen } = useContext(ModalContext);

  const {
    items: carriers,
    status,
    error
  } = useSelector((state: RootState) => state.carriers);

  // const handleClick = () => {
  //   toggleOpen();
  // };

  useEffect(() => {
    dispatch(fetchCarriers());
  }, [dispatch]);

  return (
    <>
      <div className='relative flex justify-end mb-6'>
        <div className='absolute right-4 bottom-2'>
          <Button onClick={toggleOpen}>Add Carrier</Button>
        </div>
        <FormModal>
          <CarrierForm />
        </FormModal>
      </div>
      <Table columns={columns} data={carriers}></Table>
    </>
  );
}
