export type LoadStatus =
  | 'OPEN'
  | 'COVERED'
  | 'DISPATCHED'
  | 'LOADING'
  | 'ON_ROUTE'
  | 'UNLOADING'
  | 'DELIVERED'
  | 'NEEDS_REVIEW'
  | 'CLAIM';

export interface LoadData {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  loadNum: string;
  payOrderNum: string;
  shipDate: Date | null;
  deliveryDate: Date | null;
  carrierId: string | null;
  driverId: string | null;
  customerId: string;
  originId: string | null;
  destId: string | null;
  status: LoadStatus;
  carrier: { carrierName: string } | null;
  driver: { name: string } | null;
  customer: { companyName: string } | null;
  shipper: { name: string } | null;
  consignee: { name: string } | null;

  orgId: string;
  organization: { orgName: string };
}

export interface LoadFormData {
  orgName: string;
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

// map load types when needed
export const loadFieldMap: Record<string, keyof LoadData> = {
  Status: 'status',
  'Load Number': 'loadNum',
  'Pay Order Number': 'payOrderNum',
  Customer: 'customer',
  Driver: 'driver',
  Carrier: 'carrier',
  Shipper: 'shipper',
  Consignee: 'consignee',
  'Date Shipped': 'shipDate',
  'Date Delivered': 'deliveryDate',
};
