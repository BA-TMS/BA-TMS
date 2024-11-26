'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import UpdateTeamMember from '@/components/Forms/Settings/UpdateTeamMember';
import { RootState } from '@/store/store';
import { FormattedTeamMember, TeamMember } from '@/types/teamTypes';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function UpdateTeamMemberPage() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const memberId = pathname.split('/settings/team/update-user/')[1];

  // use the id to pull from redux
  const user = useSelector((state: RootState) =>
    state.team.items.find((user: TeamMember) => user.id === memberId)
  );

  return (
    <FullPageFormContainer title={'Update Team Member'}>
      <UpdateTeamMember user={user as FormattedTeamMember} />
    </FullPageFormContainer>
  );
}
