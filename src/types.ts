export interface ButtonProps {
  name: string;
  type: 'button' | 'submit' | 'reset';
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
