// table to display form data
// if i had more time, this could be a modal that pops up
// also would make new rows be added to table each time form is filled out
// table needs to be more rounded to fit with design aesthetic

import { TableProps } from '@/types';

export default function Table(props: TableProps) {
  return (
    <div className="mt-4">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border rounded px-4 py-2 uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              First Name
            </th>
            <th className="border rounded px-4 py-2 uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              Last Name
            </th>
            <th className="border rounded px-4 py-2 uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              City
            </th>
            <th className="border rounded px-4 py-2 uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              State
            </th>
            <th className="border rounded px-4 py-2 uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              Zip
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border rounded px-4 py-2 tracking-wide text-white-700 text-xs font-bold mb-2">
              {props.formData.firstName}
            </td>
            <td className="border rounded px-4 py-2 tracking-wide text-white-700 text-xs font-bold mb-2">
              {props.formData.lastName}
            </td>
            <td className="border rounded px-4 py-2 tracking-wide text-white-700 text-xs font-bold mb-2">
              {props.formData.city}
            </td>
            <td className="border rounded px-4 py-2 tracking-wide text-white-700 text-xs font-bold mb-2">
              {props.formData.state}
            </td>
            <td className="border rounded px-4 py-2 tracking-wide text-white-700 text-xs font-bold mb-2">
              {props.formData.zip}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
