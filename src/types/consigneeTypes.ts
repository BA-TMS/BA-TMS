export interface ConsigneeFormData {
  'Consignee Name': string;
  Address: string;
  'Address Line 2'?: string;
  City: string;
  State: string;
  Country: string;
  Zip: string;
  'Country Code': string;
  'Phone Number': string;
  'Contact Name'?: string;
  Notes?: string;
}

export interface ConsigneeData {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  name: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: number;
  telephone: string;
}
