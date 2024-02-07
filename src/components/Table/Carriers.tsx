'use client';

/* Create search bar and popup modal for edit and add user */

// import ModalOne from "@/components/Modals/ModalOne";
import ModalExample from "@/components/Modals/ModalExample";
import { useState, useEffect } from 'react';
import { getCarriers } from '@/lib/dbActions';

type Carrier = {
  name: string;
  address: string;
  addressAddOn: string;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
  dotID: string;
};

const tableHeaders = [
  'Name', 
  'Address', 
  'Address AddOn', 
  'City', 
  'State', 
  'Post Country', 
  'Post Code', 
  'Tel Country', 
  'Telephone', 
  'DOT ID'
];
export default function TableJ() {
  const [modalOpen, setModalOpen] = useState(false);
  const [carriers, setCarriers] = useState<Carrier[]>([]);

  useEffect(() => {
    const fetchCarriers = async () => {
      const data = await getCarriers();
      const carriersData: Carrier[] = data.map((item) => ({
        name: item.name,
        address: item.address,
        addressAddOn: item.addressAddOn || '', // Convert null to empty string
        city: item.city,
        state: item.state,
        postCountry: item.postCountry,
        postCode: item.postCode,
        telCountry: item.telCountry.toString(), // Convert number to string
        telephone: item.telephone,
        dotID: item.dotId.toString(), // Adjust property name and convert number to string if necessary
      }));
      setCarriers(carriersData);
    };

    fetchCarriers();
  }, []);
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <ModalExample modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
      </div>
      
      {/* Start of Data Table */}
      <div className="mt-8 flow-root">
        <div className="data-table-common rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

            {/* dividing line for table */}
            <table className="min-w-full divide-y divide-gray-300">
              <thead>

                {/* Looping through headers */}
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index} scope="col" className={`py-3.5 ${index === 0 ? 'pl-4 pr-3 text-left sm:pl-0' : 'px-3 text-left'}`}>
                      {header}
                    </th>
                  ))}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              
              {/* users list */}
              <tbody className="divide-y divide-gray-200">
                {carriers.map((carrier, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md text-gray-900 sm:pl-0">
                      {carrier.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.address}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.addressAddOn}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.city}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.state}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.postCountry}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.postCode}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.telCountry}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.telephone}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{carrier.dotID}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-md sm:pr-0">
                      {!modalOpen && (
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {carrier.name}</span>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
