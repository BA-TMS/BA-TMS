'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter } from 'next/navigation';

// this component handles sending an email invite for a new user using supabase auth

const options = [
  { Admin: 'ADMIN' },
  { 'Sales Rep': 'SALES_REP' },
  { Dispatcher: 'DISPATCHER' },
  { Owner: 'OWNER' },
];

const userSchema = yup.object({
  'First Name': yup.string().required('First Name is required.'),
  'Last Name': yup.string().required('Last Name is required.'),
  Email: yup
    .string()
    .email('Must use a valid email.')
    .required('Email is required.'),
  Role: yup.string().required('Please enter user role'),
});

type User = yup.InferType<typeof userSchema>;

const AddUserForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    // reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: {
      'First Name': '',
      'Last Name': '',
      Email: '',
      Role: 'DISPATCHER',
    },
    resolver: yupResolver(userSchema),
  });

  // we will want to tie this in with redux I think
  const onSubmit = async (data: User) => {
    console.log('submitting', data);
    // reset(); // update form to default values
    router.push('/settings/team');

    try {
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(
        'email@example.com'
      );
    } catch (error) {
      console.log('Error submitting form:', error);
      setError('root', { message: 'Error Submitting Form - Please try Again' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full justify-between"
    >
      <p className="mt-5 mb-5 body2 text-grey-800 text-center">
        Send an email to invite a new user to join your team.
      </p>
      <div className="">
        <TextInput control={control} name="First Name" required={true} />

        <TextInput control={control} name="Last Name" required={true} />

        <TextInput
          control={control}
          name="Email"
          type="email"
          required={true}
        />

        <SelectInput
          control={control}
          name="Role"
          options={options}
          required={true}
        />
      </div>

      {errors.root && <p className="mb-5 text-danger">{errors.root.message}</p>}

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            intent="success"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel Adding User?');
              if (cancel) {
                router.push('/settings/team');
              } else return;
            }}
          >
            Cancel
          </Button>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Invite User
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
