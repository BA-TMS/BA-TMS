export interface ShipperData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string;

  name: string;
  address: string | null;
  addressField2: string | null;
  addressField3: string | null;
  city: string;
  state: string;
  postCode: string;
  postCountry: string;

  contactName: string | null;
  contactEmail: string | null;
  telephone: string | null;
  tollFree: string | null;

  shippingHours: string | null;
  appointments: string | null;
  intersections: string | null;

  notes: string | null;

  orgId: string;
  organization: { orgName: string };

  consigneeId: string | null;
  consignee: { name: string } | null;
}

export interface ShipperFormData {
  orgName: string;
  Status: string;
  'Shipper Name': string;

  Address: string | null;
  'Address Line 2': string | null;
  'Address Line 3': string | null;
  City: string;
  State: string;
  Zip: string;
  Country: string;

  Contact: string | null;
  Email: string | null;
  Telephone: string | null;
  'Toll Free': string | null;

  'Shipping Hours': string | null;
  Appointments: string | null;
  Intersections: string | null;

  Notes: string | null;
}

export const shipperDataMap: Record<string, keyof ShipperData> = {
  Status: 'status',
  'Shipper Name': 'name',

  Address: 'address',
  'Address Line 2': 'addressField2',
  'Address Line 3': 'addressField3',
  City: 'city',
  State: 'state',
  Zip: 'postCode',
  Country: 'postCountry',

  Contact: 'contactName',
  Email: 'contactEmail',
  Telephone: 'telephone',
  'Toll Free': 'tollFree',

  'Shipping Hours': 'shippingHours',
  Appointments: 'appointments',
  Intersections: 'intersections',

  Notes: 'notes',
};
