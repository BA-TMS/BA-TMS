/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';

// this is a context to avoid prop drilling through pages/ modals/ forms
// save form data state and access it here

interface ModalContextType {
  isOpen: boolean;
  data: any; // Replace with appropriate type
  toggleOpen: (param?: any) => void;
  formData: FormObject<any>;
  saveFormValues: (values: FormObject<any>) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

type FormObject<T = any> = {
  [key: string]: T;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  data: null,
  toggleOpen: () => {},
  formData: {},
  saveFormValues: () => {},
});

export const ContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // get rid of this one eventually (refactor customer page before removing)
  const [data, setData] = useState<any>(null);

  // NEW FORM DATA
  const [formData, setFormData] = useState<FormObject<any>>({});

  // EDITING NEW FORM DATA
  // function takes in values as an object, and optional reset parameter which defaults to false
  const saveFormValues = (values: FormObject<any>, reset: boolean = false) => {
    if (reset) {
      setFormData(values); // empty object in context
    } else {
      setFormData((prevData) => ({ ...prevData, ...values })); // update object in context
    }
  };

  // how we open/ close said modal
  // optional data if we are dealing with form updates- this can be removed later (see line #34)
  function toggleOpen(data = null) {
    if (data !== null) {
      setData(data);
    }
    setIsOpen(!isOpen);
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, toggleOpen, data, formData, saveFormValues }}
    >
      {children}
    </ModalContext.Provider>
  );
};
