export interface BrokerData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string;

  name: string;
  crossing: string;
  telephone: string;
  tollFree: string | null;
}

export interface BrokerFormData {
  'Broker Name': string;
  Crossing: string;
  Telephone: string;
  'Toll Free': string;
}
