export interface TeamMember {
  id: String;
  createdAt: Date | string;
  updatedAt: Date | string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string | null;
  organization: { name: string } | null; // how does this come in?
  orgId: string;
  Permissions?: UserPermissions; // permissions table
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
