import Button from './button';
import Table from './table';
import { ModalProps } from '@/types';

export default function Modal(props: ModalProps) {
  return (
    <div className="flex flex-col content-center items-center bg-black border border-blue-500 p-6 rounded-lg z-10">
      <h2 className="text-lg font-bold">Secret Customer Data</h2>
      <Table formData={props.formData} />
      <Button type="button" name="Close" onClick={props.onClick} />
    </div>
  );
}
