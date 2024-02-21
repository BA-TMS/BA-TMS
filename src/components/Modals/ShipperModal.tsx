'use client';

import React, { useEffect, useRef } from 'react';
import ShipperForm from '../Forms/ShipperForm';
import { Dispatch, SetStateAction } from 'react';

interface ShipperModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ShipperModal: React.FC<ShipperModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on click outside
  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOutsideHandler);
    return () => document.removeEventListener('mousedown', clickOutsideHandler);
  }, [isModalOpen, setIsModalOpen]);

  // Close modal if the ESC key is pressed
  useEffect(() => {
    const escKeyHandler = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', escKeyHandler);
    return () => document.removeEventListener('keydown', escKeyHandler);
  }, [isModalOpen, setIsModalOpen]);

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
        >
          <div
            ref={modalRef}
            className="modal-content"
          >
            <ShipperForm modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipperModal;
