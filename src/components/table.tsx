'use client';

// future updates: table needs to be more rounded to fit with design aesthetic

import { useEffect, useState, useMemo } from 'react';
import { TableProps } from '@/types';
import { CharacterData } from '@/types';

export default function Table(props: TableProps) {
  const [data, setData] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  // initial fetch to Rick and Morty API route
  // update to fetch to database
  // the console.log is showing up twice- so it is definitely re-rendering
  // figure out how to use devtools with next.js

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
          <table className="table-auto mx-auto rounded-lg text-left border-separate border-1 w-full">
            <thead className="rounded-tl-sm bg-blue-900 pl-12">
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
          {/* table that accepts the form data */}
          <table className="table-auto mx-auto rounded-lg text-left border-separate border-1 w-full">
            <thead className="rounded-tl-sm bg-blue-900 pl-12">
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
