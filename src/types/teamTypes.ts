export interface TeamMember {
  id: String;
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
  user: TeamMember; // is this right?
}
