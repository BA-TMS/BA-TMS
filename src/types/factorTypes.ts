export interface FactorData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string;

  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;

  primaryContact: string | null;
  telephone: string;
  tollFree: string | null;
  email: string | null;
  secondaryContact: string | null;
  notes: string | null;

  currency: string | null;
  paymentTerms: string | null;
  taxId: string | null;

  // carriers: string;
  // customers: string;

  orgId: string;
  organization: { orgName: string };
}

export interface FactorFormData {
  'Factoring Company Name': string;
  Address: string;
  'Address Line 2'?: string;
  City: string;
  State: string;
  Country: string;
  Zip: string;
  'Country Code': string;
  'Phone Number': string;
  Notes?: string;
}
