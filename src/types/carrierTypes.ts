export interface CarrierData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string; // "ACTIVE" | "INACTIVE" ??

  carrierName: string;
  address: string;
  addressField2: string | null;
  addressField3: string | null;
  city: string;
  state: string;
  postCountry: string;
  postCode: string;

  contactName: string | null;
  contactEmail: string | null;
  contactTelephone: string;
  contactTollFree: string | null;
  contactFax: string | null;

  paymentTerms: string;
  taxId: string | null;
  docketNumType: string;
  docketNumber: string;
  ursNumber: string | null;
  dotId: string;

  factor: { name: string } | null; // i think
  factorId: string | null;

  notes: string;
}

export interface CarrierInsuranceData {
  id: string;
  // carrier   Carrier  @relation(fields: [carrierId], references: [id])
  carrier: { name: string };
  // carrierId String   @unique
  carrierId: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;

  liabilityCompany: string | null;
  liabilityPolicy: string | null;
  liabilityExpiration: Date | null;
  liabilityTelephone: string | null;
  liabilityContact: string | null;

  autoInsCompany: string | null;
  autoInsPolicy: string | null;
  autoInsExpiration: Date | null;
  autoInsTelephone: string | null;
  autoInsContact: string | null;

  cargoCompany: string | null;
  cargoPolicy: string | null;
  cargoExpiration: Date | null;
  cargoTelephone: string | null;
  cargoContact: string | null;
  cargoWSIB: string | null;

  fmcsaInsCompany: string;
  fmcsaInsPolicy: string;
  fmcsaInsExpiration: Date | null;
  fmcsaType: string;
  fmcsaCoverage: string;
  fmcsaTelephone: string;
}

export interface CarrierFormData {
  Status: string;
  'Carrier Name': string;
  Address: string;
  'Address Line 2': string | null;
  'Address Line 3': string | null;
  City: string;
  State: string;
  Zip: string;
  Country: string;

  'Contact Name': string;
  'Contact Email': string;
  Telephone: string;
  'Toll Free': string | null;
  Fax: string | null;

  'Payment Terms': string;
  'Tax ID#': string | null;
  'Docket Number Type': string;
  'Docket Number': string;
  'URS #': string | null;
  'DOT ID#': string;
  'Factoring Company': string | null;

  Notes: string | null;
}
