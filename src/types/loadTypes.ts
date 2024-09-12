export type LoadStatus =
  | 'ON_ROUTE'
  | 'OPEN'
  | 'REFUSED'
  | 'COVERED'
  | 'PENDING'
  | 'DISPATCHED'
  | 'LOADING_UNLOADING'
  | 'IN_YARD';

export interface LoadData {
  id?: string;
  ownerId: string;
  loadNum: string;
  payOrderNum: string;
  shipDate: Date | null;
  deliveryDate: Date | null;
  carrierId: string;
  driverId: string | null;
  customerId: string;
  originId: string | null;
  destId: string | null;
  status: LoadStatus;
  carrier: { name: string };
  driver: { name: string } | null;
  customer: { companyName: string } | null;
  shipper: { name: string } | null;
  consignee: { name: string } | null;
}

export interface LoadFormData {
  Owner: string;
  Status?: LoadStatus;
  'Load Number': string;
  'Pay Order Number': string;
  Customer: string;
  Driver?: string | null;
  Carrier: string;
  Shipper?: string | null;
  Consignee?: string | null;
  'Ship Date'?: Date | string | undefined;
  'Received Date'?: Date | string | undefined;
}

// map load types
export const loadFieldMap: Record<string, keyof LoadData> = {
  Owner: 'ownerId',
  Status: 'status',
  'Load Number': 'loadNum',
  'Pay Order Number': 'payOrderNum',
  Customer: 'customerId',
  Driver: 'driverId',
  Carrier: 'carrierId',
  Shipper: 'shipper', // id?
  Consignee: 'consignee', // id?
  'Ship Date': 'shipDate',
  'Received Date': 'deliveryDate',
};
