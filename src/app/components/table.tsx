// table to display form data
// if i had more time, this could be a modal that pops up
// also would make new rows be added to table each time form is filled out
// table needs to be more rounded to fit with design aesthetic

import { useEffect, useState } from 'react';
import { TableProps } from '@/types';

// table makes get request

export default function Table(props: TableProps) {
  // state is going to hold the data to create the table
  const [tableData, setTableData] = useState([]);

  //useEffect request for data

  return (
    <div className="mt-4">
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
  );
}
