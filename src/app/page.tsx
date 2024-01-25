'use client';


import ModalOne from "@/components/Modals/ModalOne";
import DataTableTwo from "@/components/DataTables/DataTableTwo";
import { useState } from 'react';

// Place the modal as an add button to the right side of the screen.

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  
  return (
    <>
    <DataTableTwo />
      {/* <ModalOne /> */}
    </>
  );
}