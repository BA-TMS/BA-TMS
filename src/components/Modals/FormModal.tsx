'use client';

import React, { useEffect, useRef, useContext, ReactNode } from 'react';
import { ModalContext } from '@/Context/modalContext';

interface FormModalProps {
  formTitle: string; // what you want to name the form
  children: ReactNode;
}

const FormModal = ({ formTitle, children }: FormModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { isOpen, toggleOpen } = useContext(ModalContext);

  // Define a useEffect hook inside the Modal component.
  // We will then check if the isOpen prop is true.
  // The child elements will be displayed based on the boolean isOpen prop.
  // If it is true, we proceed with the focus trapping setup.
  useEffect(() => {
    if (isOpen) {
      // query all focusable elements within the modal using the querySelectorAll method.
      // This includes buttons, links, inputs, selects, textareas, and elements with explicit tabindex values.
      // TypeScript doesn't like when modalRef.current is null
      // const modalElement: HTMLDivElement | null = modalRef.current;
      const modalElement = modalRef.current as HTMLDivElement;

      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      // store the first and last focusable elements in firstElement and lastElement variables
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

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
      // handleEscapeKeyPress- "Escape" key press to close the modal by calling toggleOpen
      // for some reason this is not working
      const handleEscapeKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          toggleOpen();
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
  }, [isOpen, toggleOpen]); // The useEffect hook should then be set to run whenever the dependencies (isOpen, setIsOpen) change. When isOpen changes, the effect will be triggered again. However, the code inside the effect only adds or removes event listeners based on the value of isOpen, and it doesn't directly modify the isOpen state.

  return (
    <div>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed z-999999 top-0 left-0 flex h-full min-h-screen w-full items-start justify-center bg-black/90 px-4 py-5"
        >
          <div className="my-auto w-[694px] h-5/6 overflow-auto rounded-[14.5px] border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900">
            <section className="w-full h-full">
              <header className="py-4 px-4.5 border-b border-grey-300 dark:border-grey-700">
                <h6 className="subtitle1 text-grey-800 dark:text-white">
                  {formTitle}
                </h6>
              </header>
              {children}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
