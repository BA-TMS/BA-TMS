'use client';

// table to display form data
// does a fetch request on the client side
// using SWR library for data fetching- provides a synchronous API for fetching in client components

// future updates: table needs to be more rounded to fit with design aesthetic

import { useEffect, useState } from 'react';
import { TableProps } from '@/types';

import useSWR from 'swr';
import { Suspense } from 'react';

// function for fetch request
const fetcher = (path: string) =>
  fetch(`https://rickandmortyapi.com/${path}`).then((res) => res.json());

export default function Table(props: TableProps) {
  // useSWR will automatically orchestrate data fetching and return it to component
  const characters = useSWR('api/character', fetcher);

  return (
    <div className="h-96 mt-4 overflow-y-auto">
      <Suspense fallback={<>Loading...</>}>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Species</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {characters.data?.results?.map((c: any) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.species}</td>
                <td>{c.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="table-auto">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.formData.firstName}</td>
              <td>{props.formData.lastName}</td>
              <td>{props.formData.city}</td>
              <td>{props.formData.state}</td>
              <td>{props.formData.zip}</td>
            </tr>
          </tbody>
        </table>
      </Suspense>
    </div>
  );
}
