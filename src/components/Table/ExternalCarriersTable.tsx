'use client';

import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../UI_Elements/Table/Table';
import Button from '../UI_Elements/buttons/Button';
import { fetchCarriers } from '@/store/slices/carrierSlice';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';

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

  const {
    items: carriers,
    status,
    error,
  } = useSelector((state: RootState) => state.carriers);

  useEffect(() => {
    dispatch(fetchCarriers());
  }, [dispatch]);

  return (
    <>
      <div className="relative flex justify-end mb-6">
        <div className="absolute right-4 bottom-2">
          <Link href="/carriers/add-carrier/details">
            <Button>Add Carrier</Button>
          </Link>
        </div>
      </div>
      <Table columns={columns} data={carriers}></Table>
    </>
  );
}
