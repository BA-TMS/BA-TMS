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

  CarrierInsurance?: CarrierInsuranceData; // i think?

  notes: string | null;
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
  Status: 'ACTIVE' | 'INACTIVE';
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

  'Liability Insurance Company': string | null;
  'Liability Policy #': string | null;
  'Liability Expiration Date': Date | null;
  'Liability Telephone': string | null;
  'Liability Contact': string | null;

  'Auto Insurance Company': string | null;
  'Auto Policy #': string | null;
  'Auto Expiration Date': Date | null;
  'Auto Telephone': string | null;
  'Auto Contact': string | null;

  'Cargo Company': string | null;
  'Cargo Policy #': string | null;
  'Cargo Expiration Date': Date | null;
  'Cargo Telephone': string | null;
  'Cargo Contact': string | null;
  'Cargo WSIB #': string | null;

  'FMCSA Insurance Company': string;
  'FMCSA Policy #': string;
  'FMCSA Expiration Date': Date | null;
  'FMCSA Type': string;
  'FMCSA Coverage $': string;
  'FMCSA Telephone': string;
}

export const carrierDataMap: Record<
  string,
  keyof CarrierData | keyof CarrierInsuranceData
> = {
  Status: 'status',
  'Carrier Name': 'carrierName',
  Address: 'address',
  'Address Line 2': 'addressField2',
  'Address Line 3': 'addressField3',
  City: 'city',
  State: 'state',
  Zip: 'postCode',
  Country: 'postCountry',

  'Contact Name': 'contactName',
  'Contact Email': 'contactEmail',
  Telephone: 'contactTelephone',
  'Toll Free': 'contactTollFree',
  Fax: 'contactFax',

  'Payment Terms': 'paymentTerms',
  'Tax ID#': 'taxId',
  'Docket Number Type': 'docketNumType',
  'Docket Number': 'docketNumber',
  'URS #': 'ursNumber',
  'DOT ID#': 'dotId',
  'Factoring Company': 'factorId',

  Notes: 'notes',

  'Liability Insurance Company': 'liabilityCompany',
  'Liability Policy #': 'liabilityPolicy',
  'Liability Expiration Date': 'liabilityExpiration',
  'Liability Telephone': 'liabilityTelephone',
  'Liability Contact': 'liabilityContact',

  'Auto Insurance Company': 'autoInsCompany',
  'Auto Policy #': 'autoInsPolicy',
  'Auto Expiration Date': 'autoInsExpiration',
  'Auto Telephone': 'autoInsTelephone',
  'Auto Contact': 'autoInsContact',

  'Cargo Company': 'cargoCompany',
  'Cargo Policy #': 'cargoPolicy',
  'Cargo Expiration Date': 'cargoExpiration',
  'Cargo Telephone': 'cargoTelephone',
  'Cargo Contact': 'cargoContact',
  'Cargo WSIB #': 'cargoWSIB',

  'FMCSA Insurance Company': 'fmcsaInsCompany',
  'FMCSA Policy #': 'fmcsaInsPolicy',
  'FMCSA Expiration Date': 'fmcsaInsExpiration',
  'FMCSA Type': 'fmcsaType',
  'FMCSA Coverage $': 'fmcsaCoverage',
  'FMCSA Telephone': 'fmcsaTelephone',
};
