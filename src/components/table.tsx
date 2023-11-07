'use client';

// future updates: table needs to be more rounded to fit with design aesthetic

import { useEffect, useState } from 'react';
import { TableProps } from '@/types';
import { Suspense } from 'react';

type CharacterData = {
  id: number;
  name: string;
  species: string;
  status: string;
};

export default function Table(props: TableProps) {
  const [data, setData] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    fetch('../api/data')
      .then((response) => response.json())
      .then((usefulData) => {
        console.log('useful data ', usefulData);
        setLoading(false);
        setData(usefulData);
      })
      .catch((err) => {
        console.log('Error in get request: ', err);
      });
  }, []);

  return (
    <div className="h-96 mt-4 overflow-y-auto">
      {data && (
        <div>
          <h1 className="text-blue-700">DATA RECIEVED</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c: any) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.species}</td>
                  <td>{c.status}</td>
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
        </div>
      )}
    </div>
  );
}
