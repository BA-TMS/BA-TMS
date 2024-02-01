'use client';

import { useForm } from 'react-hook-form';
import { usStates } from '@/assets/data/states';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addConsignee } from '@/lib/dbActions';

const consigneeSchema = yup.object({
  consigneeName: yup.string().required('Consignee Name is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required '),
  city: yup.string().required('City is required '),
  zip: yup
    .string()
    .length(5, 'Zip must be 5 characters')
    .required('Zip Code is required '),
  contactName: yup.string().required('Contact Name is required'),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Must use valid phone number')
    .required('Contact phone number required'),
  email: yup
    .string()
    .email('Must use a valid email')
    .required('Contact email required'),
  notes: yup.string().max(250, 'Must be under 250 characters'),
});

type Consignee = yup.InferType<typeof consigneeSchema>;

export default function ConsigneeForm() {
  const {
    register, // connect inputs to useForm with register
    handleSubmit,
    reset, // for resetting form
    setError, // async error handling
    formState: { errors, isSubmitting }, // errors for the errors in validation, isSubmitting is boolean when form is submitting
  } = useForm({ resolver: yupResolver(consigneeSchema) });

  // add our backend functionality here
  const onSubmit = async (data: Consignee) => {
    try {
      console.log(data); // see the object being sent
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      // throw Error; // for testing
      // addConsignee(data); // database action
      reset();
    } catch (error) {
      setError('root', { message: 'Error Submitting Form- Please try Again' }); // root is for errors that belong to form as a whole
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              New Consignee
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Consignee Name
                </label>
                <input
                  {...register('consigneeName')}
                  type="text"
                  placeholder="Consignee Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                />
                {errors.consigneeName && (
                  <p className="mt-1 text-danger">
                    {errors.consigneeName.message}
                  </p>
                )}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address
                </label>
                <input
                  {...register('address')}
                  type="text"
                  placeholder="Consignee Address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.address && (
                  <p className="mt-1 text-danger">{errors.address.message}</p>
                )}
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Country
                  </label>
                  {/* need to fix the dropdown symbol here */}
                  <select
                    {...register('country')}
                    className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    {/* how many country options should we have? Also phone codes */}
                    <option value="">Select Country</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-danger">{errors.country.message}</p>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    State
                  </label>
                  <select
                    {...register('state')}
                    className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select State</option>
                    {usStates &&
                      usStates.map((state, index) => (
                        <option key={index + 1} value={`${state.name}`}>
                          {`${state.name}`}
                        </option>
                      ))}
                  </select>
                  {errors.state && (
                    <p className="mt-1 text-danger">{errors.state.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    City
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    placeholder="City"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.city && (
                    <p className="mt-1 text-danger">{errors.city.message}</p>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Postal/ Zip
                  </label>
                  <input
                    {...register('zip')}
                    type="text"
                    placeholder="Postal/ Zip"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.zip && (
                    <p className="mt-1 text-danger">{errors.zip.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Contact Name
                  </label>
                  <input
                    {...register('contactName')}
                    type="text"
                    placeholder="Contact Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-danger">
                      {errors.contactName.message}
                    </p>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="text"
                    placeholder="Phone Number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-danger">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Contact Email Address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.email && (
                  <p className="mt-1 text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={6}
                  placeholder="Notes"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
                {errors.notes && (
                  <p className="mt-1 text-danger">{errors.notes.message}</p>
                )}
                {/* general form submission error display */}
                {errors.root && (
                  <p className="mt-1 text-danger">{errors.root.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/4 rounded bg-primary p-3 font-medium text-gray"
                >
                  {isSubmitting ? 'Submitting' : 'Add'}
                </button>
                <button
                  type="reset"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                  className="rounded bg-red p-3 font-medium text-gray ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
