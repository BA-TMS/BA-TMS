'use client';
import TableActionsPopover from '../Popovers/TableActions';

interface SingleLoad {
  id: number;
  ownerId: number;
  loadNum: number;
  carrierId: number;
  driverId: number | null;
  customerId: number;
  originId: number | null;
  destId: number | null;
  status: string
  carrier: {name: string};
  driver: {name: string} | null;
  customer: {name: string};
  shipper: {name: string} | null;
  consignee: {name: string} | null;
}

interface LoadTableProps {
  loads: SingleLoad[];
}

export default function LoadTable({ loads }: LoadTableProps): JSX.Element {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Load Number
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Carrier
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Driver
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Customer
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Origin
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Destination
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loads.map((load: SingleLoad, key: number) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {load.loadNum}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {load.carrier.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {load.driver ? load.driver.name : ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {load.customer.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {load.shipper ? load.shipper.name : ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {load.consignee ? load.consignee.name : ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{load.status}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <TableActionsPopover></TableActionsPopover>
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
