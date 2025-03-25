'use Client';

import { useRouter } from 'next/navigation';
import { FormattedTeamMember } from '@/types/teamTypes';
import Button from '@/components/UI_Elements/Buttons/Button';
import DataDisplay from '@/components/UI_Elements/Display/DataDisplay';

// this component displays information about a specific user/ member of the team

interface ViewMemberProps {
  data: FormattedTeamMember | undefined;
}

const ViewTeamMember = ({ data }: ViewMemberProps) => {
  const router = useRouter();

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <div className="py-5 grow">
          <p className="body2 text-error-dark text-center">
            Oops! Something went wrong- Could not find team member.
          </p>
        </div>
        <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-end bg-white dark:bg-grey-900 z-10">
          <Button
            type="button"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 flex flex-col">
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="w-full">
          <DataDisplay title="Name" text={data['name']} />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="Role" text={data['role']} />
        </div>
        <div className="w-full md:w-1/3">
          <DataDisplay title="Status" text={data['status']} />
        </div>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row mb-5">
        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay title="Email" text={data['email']} />
        </div>

        <div className="flex flex-col w-full xl:w-1/2">
          <DataDisplay title="Telephone" text={data['telephone']} />
        </div>
      </div>

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-between sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <Button
          type="button"
          variant="outline"
          intent="default"
          onClick={() => {
            router.push(`/settings/team/update-user/${data['id']}`); // go to edit route
          }}
        >
          Edit
        </Button>
        <Button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

export default ViewTeamMember;
