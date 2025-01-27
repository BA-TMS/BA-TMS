export interface BrokerData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string;

  name: string;
  crossing: string;
  telephone: string;
  tollFree: string | null;

  orgId: string;
  organization: { orgName: string };
}

export interface BrokerFormData {
  Status: 'ACTIVE' | 'INACTIVE';
  'Broker Name': string;
  Crossing: string;
  Telephone: string;
  'Toll Free': string;

  orgName: string;
}

export const brokerDataMap: Record<string, keyof BrokerData> = {
  Status: 'status',
  'Broker Name': 'name',
  Crossing: 'crossing',
  Telephone: 'telephone',
  'Toll Free': 'tollFree',
};
