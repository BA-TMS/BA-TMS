'use client';

import { useEffect, useContext } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './UI_Elements/TextInput';
import SelectInput from './UI_Elements/SelectInput';
import { usStates } from '@/components/Forms/data/states';
import { ModalContext } from '@/Context/modalContext';
import { addUser } from '@/lib/dbActions';

const otherSchema = yup.object({
  'Other Name': yup.string().required('Other Name is required'),
  isOnDispatch: yup.bool(),
});

type Other = yup.InferType<typeof otherSchema>;

export const OtherNumbersForm = () => {
  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Other>({
    defaultValues: {
      'Other Name': '',
      isOnDispatch: false,
    },
    resolver: yupResolver(otherSchema),
  });

  /* CHECKBOX COMPONENT */
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const Checkbox = ({ name, label, value, onChange }) => {
    return (
      <label>
        <input
          name={name}
          type="checkbox"
          checked={value}
          onChange={onChange}
        />
        {label}
      </label>
    );
  };
  /* END CHECKBOX COMPONENT */

  const { toggleOpen } = useContext(ModalContext);

  const onSubmit = async (data: Other) => {
    try {
      await addUser({ user: data }); // TODO: Change to addOther
      toggleOpen();
    } catch (error) {
      alert("didn't save");
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        'Other Name': '',
        isOnDispatch: false,
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-xl mx-auto overflow-y-auto max-h-screen">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Other Number
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <TextInput control={control} name="Other Name" required={true} />

            {/* DISPATCH BOARD */}
            <label
              className="font-medium text-black dark:text-white"
              style={{ paddingRight: '30px' }}
            >
              Dispatch Board
            </label>
            <br />
            <Checkbox
              name="isOnDispatch"
              label=" Show this item on Dispatch"
              value={checked}
              onChange={handleChange}
            />
            <br />
            <br />
            {/* END DISPATCH BOARD */}

            {/* STATUS */}
            <tr>
              <td className="font-medium text-black dark:text-white">Status</td>
              <label style={{ paddingLeft: '30px' }}>
                <input name="status" id="is_active" type="radio" value="0" />
                Active
              </label>

              <label style={{ paddingLeft: '30px' }}>
                <input name="status" id="is_inactive" type="radio" value="1" />
                Inactive
              </label>
            </tr>
            {/* END STATUS */}
            {/*<TextInput control={control} name="isOnDispatch" required={true} />*/}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/4 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-80"
              >
                {isSubmitting ? 'Submitting' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                disabled={isSubmitting}
                className="rounded bg-red p-3 font-medium text-gray ml-2 hover:bg-opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherNumbersForm;
