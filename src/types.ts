export interface FormProps {
  firstName: string;
  lastName: string;
  password: string;
  city: string;
  state: string;
  zip: string;
  handleButtonClick(event: React.MouseEvent<HTMLButtonElement>): void;
}
