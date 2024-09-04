export interface LoadData {
  id: string;
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
  status: string;
  carrier: { name: string };
  driver: { name: string } | null;
  customer: { companyName: string } | null;
  shipper: { name: string } | null;
  consignee: { name: string } | null;
}
