export interface BrokerFormData {
  'Broker Name': string;
  Crossing: string;
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

export interface BrokerData {
  name: string;
  crossing: string;
  address: string;
  addressAddOn: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;
  telCountry: string;
  telephone: string;
}
