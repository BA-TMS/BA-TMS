export interface ConsigneeData {
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

  recievingHours: string | null;
  appointments: string | null;
  intersections: string | null;

  notes: string | null;

  orgId: string;
  organization: { orgName: string };

  shipper: { name: string } | null;
}

export interface ConsigneeFormData {
  orgName: string;
  Status: string;
  'Consignee Name': string;

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

  'Recieving Hours': string | null;
  Appointments: string | null;
  Intersections: string | null;

  Notes: string | null;
  shipper?: boolean; // optional
}

export const consigneeDataMap: Record<string, keyof ConsigneeData> = {
  Status: 'status',
  'Consignee Name': 'name',

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

  'Recieving Hours': 'recievingHours',
  Appointments: 'appointments',
  Intersections: 'intersections',

  Notes: 'notes',
  shipper: 'shipper',
};
