'use client';

import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import CarrierForm from '../Forms/CarrierForm';

interface CarrierModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CarrierModal: React.FC<CarrierModalProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);
  const formRef = useRef<any>(null); // for the form to not close modal which is still not working

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }: MouseEvent) => {
  //     if (!modal.current || !formRef.current) return;

  //     const isInsideModal =
  //       modal.current.contains(target) || formRef.current.contains(target);

  //     if (!modalOpen || isInsideModal || trigger.current.contains(target))
  //       return;

  //     setModalOpen(false);
  //   };

  //   document.addEventListener('click', clickHandler);

  //   return () => document.removeEventListener('click', clickHandler);
  // }, [modalOpen, setModalOpen]);

  return (
    <div>
      <button
        ref={trigger}
        onClick={() => setModalOpen(!modalOpen)}
        className="rounded-md bg-primary py-3 px-9 font-medium text-white"
      >
        Add Carrier
      </button>
      <div
        className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-start justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          ref={modal}
          onFocus={() => setModalOpen(true)}
          onBlur={() => setModalOpen(false)}
          className="max-w-142.5 rounded-lg bg-white"
        >
          <CarrierForm ref={formRef} closeModal={() => setModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default CarrierModal;
