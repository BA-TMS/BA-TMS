export interface ButtonProps {
  name: string;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick: () => void;
}

export interface FormData {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
}

export interface TableProps {
  formData: {
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface ModalProps {
  formData: FormData;
  onClick: () => void;
}

export type CharacterData = {
  id: number;
  name: string;
  salary: string;
  age: string;
};
