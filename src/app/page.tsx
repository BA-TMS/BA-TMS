'use client';


import ModalOne from "@/components/Modal/ModalOne";

import { useState } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  
  return (
    <>
      <ModalOne />
    </>
  );
}
