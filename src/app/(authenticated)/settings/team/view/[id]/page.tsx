'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ViewTeamMember from '@/components/Forms/Settings/ViewTeamMember';
import { RootState } from '@/store/store';
import { FormattedTeamMember, TeamMember } from '@/types/teamTypes';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewTeamMemberPage() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const memberId = pathname.split('/settings/team/view/')[1];

  // use the id to pull from redux
  const user = useSelector((state: RootState) =>
    state.team.items.find((user: TeamMember) => user.id === memberId)
  );

  return (
    <FullPageFormContainer title={'View Team Member'}>
      <ViewTeamMember data={user as FormattedTeamMember} />
    </FullPageFormContainer>
  );
}
