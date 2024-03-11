'use client';

import TableActionsPopover from '../Popovers/TableActions';

interface CustomerData {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: number;
  telephone: string;
}

interface CustomerTableProps {
  data: CustomerData[];
}

export default function CustomerTable({
  data,
}: CustomerTableProps): JSX.Element {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 mt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Customer Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Address
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  City
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  State
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Postal Code/ Zip
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Contact Name
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Contact Email
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Notes
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((customer: CustomerData, key: number) => (
                <tr
                  key={key}
                  className={
                    key === data.length - 1
                      ? ''
                      : 'border-b border-[#eee] dark:border-strokedark'
                  }
                >
                  <td
                    className={`py-5 px-4 pl-9 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    } xl:pl-11`}
                  >
                    <h5 className="font-medium text-black dark:text-white">
                      {customer.name}
                    </h5>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <p className="text-black dark:text-white">
                      {customer.address}
                    </p>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <p className="text-black dark:text-white">
                      {customer.city}
                    </p>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <p className="text-black dark:text-white">
                      {customer.state}
                    </p>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <p className="text-black dark:text-white">
                      {customer.postCode}
                    </p>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <p className="text-black dark:text-white">{'contact'}</p>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <p className="text-black dark:text-white">{'email'}</p>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <p className="text-black dark:text-white">{'notes'}</p>
                  </td>
                  <td
                    className={`py-5 px-4 ${
                      key === data.length - 1
                        ? ''
                        : 'border-b border-[#eee] dark:border-strokedark'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <TableActionsPopover></TableActionsPopover>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
