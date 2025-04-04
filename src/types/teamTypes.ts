export interface TeamMember {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string | null;
  organization: { orgName: string; id: string };
  orgId: string;
  Permissions: { role: string; status: string } | null;
}

export interface UserPermissions {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: 'ADMIN' | 'SALES_REP' | 'DISPATCHER' | 'OWNER';
  status: 'ACTIVE' | 'INACTIVE';
  userId: string;
  user: TeamMember;
}

export interface FormattedTeamMember extends TeamMember {
  name: string;
  role: 'ADMIN' | 'SALES_REP' | 'DISPATCHER' | 'OWNER';
  status: 'ACTIVE' | 'INACTIVE';
}
