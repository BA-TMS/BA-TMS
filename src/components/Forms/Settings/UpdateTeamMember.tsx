'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import TextInput from '@ui/Form/TextInput';
import SelectInput from '@ui/Form/SelectInput';
import Button from '@/components/UI_Elements/Buttons/Button';
import { useRouter } from 'next/navigation';
import { FormattedTeamMember } from '@/types/teamTypes';
import { updateTeamMember } from '@/store/slices/teamSlice';
import { resendInvite } from '@/app/(authenticated)/settings/actions';

// this component updates details for a user in both public.users and auth.users

interface FormProps {
  user: FormattedTeamMember;
}

const options = [
  { Admin: 'ADMIN' },
  { 'Sales Rep': 'SALES_REP' },
  { Dispatcher: 'DISPATCHER' },
  { Owner: 'OWNER' },
];

const statusOptions = [{ Active: 'ACTIVE' }, { Inactive: 'INACTIVE' }];

const roleMap = {
  Dispatcher: 'DISPATCHER',
  'Sales Rep': 'SALES_REP',
  Admin: 'ADMIN',
  Owner: 'OWNER',
} as const;

type RoleMap = typeof roleMap;
type RoleKey = keyof RoleMap;

const statusMap = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const;

type StatusMap = typeof statusMap;
type StatusKey = keyof StatusMap;

const userSchema = yup.object({
  'First Name': yup.string().required('First Name is required.'),
  'Last Name': yup.string().required('Last Name is required.'),
  Email: yup
    .string()
    .email('Must use a valid email.')
    .required('Email is required.'),
  Telephone: yup.string().nullable(),
  Role: yup.string().required('Please enter user role'),
  Status: yup.string().required('Please enter user status'),
});

type User = yup.InferType<typeof userSchema>;

const UpdateTeamMember = ({ user }: FormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const {
    setValue,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      'First Name': '',
      'Last Name': '',
      Email: '',
      Telephone: '',
      Role: '',
      Status: '',
    },
    resolver: yupResolver(userSchema),
  });

  // populate with existing data when updating
  useEffect(() => {
    if (user) {
      setValue('First Name', user['firstName']);
      setValue('Last Name', user['lastName']);
      setValue('Email', user['email']);
      setValue('Telephone', user['telephone']);
      setValue('Role', roleMap[user['role'] as RoleKey]);
      setValue('Status', statusMap[user['status'] as StatusKey]);
    }
  }, [user, setValue]);

  // action to upate public.user
  // action to update auth.user metadata
  const onSubmit = async (data: User) => {
    setIsSubmitting(true);

    try {
      await dispatch(
        updateTeamMember({
          id: user['id'],
          updatedUser: data,
        })
      ).unwrap();
      router.push('/settings/team');
    } catch (error) {
      setError('root', { message: `${error}` });
      setIsSubmitting(false);
      return;
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  // function to resend invite
  const handleInvite = async () => {
    setIsSubmitting(true);

    try {
      await resendInvite(user['email']);
      //   router.push('/settings/team');
      setError('root', {
        message:
          'If user has not confirmed, their email, a confirmation email will be sent',
      });
    } catch (error) {
      setError('root', { message: `${error}` });
      setIsSubmitting(false);
      return;
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full justify-between"
    >
      <div className="mt-5">
        <TextInput control={control} name="First Name" required={true} />

        <TextInput control={control} name="Last Name" required={true} />

        <TextInput
          control={control}
          name="Email"
          type="email"
          required={true}
        />

        <TextInput control={control} name="Telephone" type="tel" />

        <SelectInput
          control={control}
          name="Role"
          options={options}
          required={true}
        />

        <SelectInput
          control={control}
          name="Status"
          options={statusOptions}
          required={true}
        />
      </div>

      {errors.root && (
        <p className="font-public font-normal text-text-sm text-error mb-2">
          {errors.root.message}
        </p>
      )}

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            intent="success"
            disabled={isSubmitting}
            onClick={() => {
              const cancel = confirm('Cancel Updating User?');
              if (cancel) {
                router.push('/settings/team');
              } else return;
            }}
          >
            Cancel
          </Button>
        </div>
        <Button type="button" variant="text" onClick={handleInvite}>
          Click here to re-send email invite
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Update User
        </Button>
      </div>
    </form>
  );
};

export default UpdateTeamMember;
