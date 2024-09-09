import { Decimal } from '@prisma/client/runtime/library';

export type CustomerData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string; // "ACTIVE" | "INACTIVE" ??
  companyName: string;
  contactName: string;
  secondaryContactName: string | null;
  salesRepName: string | null;
  contactEmail: string;
  contactTelephone: string;
  contactTollFree: string | null;
  contactFax: string | null;
  contactCountry: string;
  contactAddress: string;
  contactAddressField2: string | null;
  contactAddressField3: string | null;
  contactCity: string;
  contactState: string;
  contactPostCode: string;
  billingEmail: string;
  billingTelephone: string;
  billingCountry: string;
  billingAddress: string;
  billingAddressField2: string | null;
  billingAddressField3: string | null;
  billingCity: string;
  billingState: string;
  billingPostCode: string;
  currency: string;
  paymentTerms: string;
  creditLimit: number | Decimal; // or null?
  federalID: string;
  // factor: string | null;
  factor: { name: string } | null;
  factorId: string | null;
};

// keys correspond to form input names
export interface CustomerFormData {
  Status: 'ACTIVE' | 'INACTIVE';
  'Company Name': string;
  'Contact Name': string;
  'Secondary Contact Name': string | null;

  'Contact Email': string;
  Telephone: string;
  'Toll Free': string | null;
  Fax: string | null;

  Address: string;
  'Address Line 2': string | null;
  'Address Line 3': string | null;
  City: string;
  State: string;
  Zip: string;
  Country: string;

  'Billing Address': string;
  'Billing Address Line 2': string | null;
  'Billing Address Line 3': string | null;
  'Billing City': string;
  'Billing State': string;
  'Billing Zip': string;
  'Billing Country': string;
  'Billing Email': string;
  'Billing Telephone': string;

  'Sales Rep': string | null;
  Currency: string;
  'Payment Terms': string;
  'Credit Limit': string | number | Decimal | undefined;
  'Federal ID': string;
  'Factoring Company': string | null;
}

export type CustomerDataKeys = keyof CustomerData;

// form field names vs db names for mapping values if needed
export const customerFieldMap: Record<string, keyof CustomerData> = {
  Status: 'status',
  'Company Name': 'companyName',
  'Contact Name': 'contactName',
  'Secondary Contact Name': 'secondaryContactName',
  'Contact Email': 'contactEmail',
  Telephone: 'contactTelephone',
  'Toll Free': 'contactTollFree',
  Fax: 'contactFax',

  Address: 'contactAddress',
  'Address Line 2': 'contactAddressField2',
  'Address Line 3': 'contactAddressField3',
  City: 'contactCity',
  State: 'contactState',
  Zip: 'contactPostCode',
  Country: 'contactCountry',

  'Billing Address': 'billingAddress',
  'Billing Address Line 2': 'billingAddressField2',
  'Billing Address Line 3': 'billingAddressField3',
  'Billing City': 'billingCity',
  'Billing State': 'billingState',
  'Billing Zip': 'billingPostCode',
  'Billing Country': 'billingCountry',
  'Billing Email': 'billingEmail',
  'Billing Telephone': 'billingTelephone',

  // advanced options
  'Sales Rep': 'salesRepName',
  Currency: 'currency',
  'Payment Terms': 'paymentTerms',
  'Credit Limit': 'creditLimit',
  'Federal ID': 'federalID',
  'Factoring Company': 'factorId',
  // 'Factoring Company ID': 'factorId', // not sure how these fields play with factor relations
  // Notes: 'notes', // don't map it yet not in db
};
