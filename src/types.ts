export interface FormProps {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  handleButtonClick(event: React.MouseEvent<HTMLButtonElement>): void;
}
