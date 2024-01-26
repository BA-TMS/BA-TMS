'use client';


import ModalOne from "@/components/Modals/ModalOne";
import DataTableTwo from "@/components/DataTables/DataTableTwo";
import TableThree from "@/components/Table/TableThree";
import TableJ from "@/components/Table/TableJ";


import { useState } from 'react';

// Place the modal as an add button to the right side of the screen.

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  
  return (
    <>
    <TableJ />
      {/* <TableThree/> */}
      {/* <DataTableTwo /> */}
      {/* <ModalOne /> */}
    </>
  );
}