import SelectInput from '@/components/Forms/UI_Elements/SelectInput';
import { usStates } from '@/components/Forms/data/states';

export default function Drayage() {
  return (
    <div>
      <h1>Welcome to Drayage Page</h1>
      <p>This is a page for managing drayage operations.</p>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          <select className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="apple">Stream 1</option>
            <option value="banana">Stream 2</option>
            <option value="orange">Stream 3</option>
          </select>
        </label>
      </div>
    </div>
  );
}
