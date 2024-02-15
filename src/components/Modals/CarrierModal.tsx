'use client';

import React, { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import CarrierForm from '../Forms/CarrierForm';

interface CarrierModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// The child elements will be displayed based on the boolean isOpen prop.
// The setter function for this boolean state is the setIsOpen prop.

const CarrierModal = ({ isOpen, setIsOpen }: CarrierModalProps) => {
  const modalRef = useRef(null);

  // const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // Define a useEffect hook inside the Modal component.
  // We will then check if the isOpen prop is true.
  // The child elements will be displayed based on the boolean isOpen prop.
  // If it is true, we proceed with the focus trapping setup.
  useEffect(() => {
    if (isOpen) {
      // query all focusable elements within the modal using the querySelectorAll method.
      // This includes buttons, links, inputs, selects, textareas, and elements with explicit tabindex values.
      const modalElement = modalRef.current;
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // store the first and last focusable elements in firstElement and lastElement variables
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // handleTabKeyPress event handler gets triggered when the “Tab” key is pressed.
      // by using event.shiftKey condition, the logic ensures that pressing the "Tab" key alone or with the "Shift" key behaves correctly for both forward and backward navigation within the focusable elements of the modal.
      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          // event.shiftKey condition is used to determine whether the "Shift" key is pressed along with the "Tab" key.
          // This condition helps handle the circular focus navigation within the modal
          // event.shiftKey property is a boolean value that indicates whether the "Shift" key was pressed at the same time as the event.
          // if event.shiftKey is true and the currently focused element is the first focusable element (document.activeElement === firstElement), it means the user is navigating backward from the first element.
          // In this case, the default tab behavior is prevented (event.preventDefault()) to avoid leaving the modal, and the focus is set on the last focusable element (lastElement.focus()). This creates a circular focus navigation within the modal.
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            // if event.shiftKey is false and the currently focused element is the last focusable element (document.activeElement === lastElement), it means the user is navigating forward from the last element.
            // Similarly, the default tab behavior is prevented, and the focus is set on the first focusable element (firstElement.focus()), ensuring the circular navigation continues within the modal.
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };
      // handleEscapeKeyPress-  Thandles the "Escape" key press to close the modal by calling the setIsOpen function.
      const handleEscapeKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      // add the event listeners to the modal element using addEventListener.
      // useEffect only adds or removes event listeners based on the isOpen state, but doesn't modify isOpen state itself to avoid rerenders
      modalElement.addEventListener('keydown', handleTabKeyPress);
      modalElement.addEventListener('keydown', handleEscapeKeyPress);

      // cleanup function to remove event listener
      return () => {
        modalElement.removeEventListener('keydown', handleTabKeyPress);
        modalElement.removeEventListener('keydown', handleEscapeKeyPress);
      };
    }
  }, [isOpen, setIsOpen]); // The useEffect hook should then be set to run whenever the dependencies (isOpen, setIsOpen) change. When isOpen changes, the effect will be triggered again. However, the code inside the effect only adds or removes event listeners based on the value of isOpen, and it doesn't directly modify the isOpen state.

  return (
    <div>
      isOpen ? (
      <div
        ref={modalRef}
        className="fixed z-999999 top-0 left-0 flex h-full min-h-screen w-full items-start justify-center bg-black/90 px-4 py-5"
      >
        <div
          ref={modal}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          className="max-w-142.5 rounded-lg bg-white"
        >
          <CarrierForm closeModal={() => setIsOpen(false)} />
        </div>
      </div>
      ) : (<></>
      );
    </div>
  );
};

export default CarrierModal;
