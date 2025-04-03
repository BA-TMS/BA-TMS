/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';

// this is a context to avoid prop drilling through pages/ modals/ forms
// save form data state and access it here

interface ModalContextType {
  isOpen: boolean;
  toggleOpen: (param?: any) => void;
  formData: FormObject<any>;
  saveFormValues: (values: FormObject<any>, reset?: boolean) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

type FormObject<T = any> = {
  [key: string]: T;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  toggleOpen: () => {},
  formData: {},
  saveFormValues: () => {},
});

export const ContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // NEW FORM DATA
  const [formData, setFormData] = useState<FormObject<any>>({});

  // EDITING NEW FORM DATA
  // function takes in values as an object, and optional reset parameter which defaults to false
  // allowing us to reset the formData to an empty object
  function saveFormValues(values: FormObject<any>, reset: boolean = false) {
    if (reset) {
      setFormData(values); // empty object in context
    } else {
      setFormData((prevData) => ({ ...prevData, ...values })); // update object in context
    }
  }

  // how we open/ close said modal
  // optional data if we are dealing with form updates- this can be removed later (see line #34)
  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, toggleOpen, formData, saveFormValues }}
    >
      {children}
    </ModalContext.Provider>
  );
};
