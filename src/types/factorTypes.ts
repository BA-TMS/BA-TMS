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
  postCode: string;
  postCountry: string;

  primaryContact: string | null;
  telephone: string;
  tollFree: string | null;
  email: string | null;
  secondaryContact: string | null;
  secondaryTelephone: string | null;
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
  orgName: string;
  Status: string;
  'Factor Name': string;

  Address: string;
  'Address Line 2': string | null;
  City: string;
  State: string;
  Zip: string;
  Country: string;

  'Primary Contact': string | null;
  Telephone: string;
  'Toll Free': string | null;
  Email: string | null;
  'Secondary Contact': string | null;
  'Secondary Telephone': string;

  Currency: string | null;
  'Payment Terms': string | null;
  'Tax ID#': string | null;
  Notes: string | null;
}
