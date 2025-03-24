export interface NumFormData {
  orgName: string;
  Status: string;

  Name: string;
  dispatch: boolean;
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

export const otherNumDataMap: Record<string, keyof NumData> = {
  Status: 'status',
  Name: 'name',
  dispatch: 'dispatch',
};
