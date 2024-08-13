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
  creditLimit: number; // or null?
  federalID: string;
  factor: string | null;
  factorID: string | null;
};
