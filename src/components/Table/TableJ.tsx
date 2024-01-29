'use client';

/* Create search bar and popup modal for edit and add user */

import ModalOne from "@/components/Modals/ModalOne";
import { useState } from 'react';

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

const tableHeaders = ['Name', 'Title', 'Email', 'Role'];

export default function TableJ() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  
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
          {/* <button
            type="button"
            onClick={toggleModal}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-md text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button> */}
          <ModalOne modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md text-gray-900 sm:pl-0">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{person.title}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{person.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{person.role}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-md sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {person.name}</span>
                      </a>
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
