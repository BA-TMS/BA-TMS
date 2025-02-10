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
  consignee: { name: string }; // check this
}

export interface ShipperFormData {
  'Shipper Name': string;
  Address: string;
  'Address Line 2'?: string;
  City: string;
  State: string;
  Country: string;
  Zip: string;
  'Country Code': string;
  'Phone Number': string;
}
