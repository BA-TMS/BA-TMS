export interface NumFormData {
  orgName: string;
  Status: string;

  Name: string;
  'Dispatch Board': boolean;
}

export interface NumData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string;

  name: string;
  dispatch: boolean;

  orgId: string;
  organization: { orgName: string };
}
