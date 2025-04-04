import { Load } from '@prisma/client';

export interface DriverFormData {
  Status: 'ACTIVE' | 'INACTIVE';
  Type: 'TEAM' | 'SINGLE';
  'Driver Name': string;
  Telephone: string;
  Email: string | null;

  Address: string | null;
  City: string;
  State: string;
  Zip: string;
  Country: string;

  License: string | null;
  Employer: string | null;
  Notes: string | null;

  orgName: string;

  // driver two information is optional
  // this is if there is a driver team
  'Driver Two Name': string;
  'Driver Telephone': string;
  'Driver Email': string | null;

  'Driver Address': string | null;
  'Driver City': string;
  'Driver State': string;
  'Driver Zip': string | null;
  'Driver Country': string;

  'Driver License': string | null;
}

export interface DriverData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string; // "ACTIVE" | "INACTIVE" ??
  type: string; // 'SINGLE' | 'TEAM ??

  name: string;
  telephone: string;
  email: string | null;
  address: string | null;
  country: string;
  state: string;
  city: string;
  zip: string | null;
  license: string | null;
  notes: string | null;

  driverTwo?: TeamDriver; // optional

  employerId: string | null;
  employer: { carrierName: string } | null;

  loads?: Load[]; // are loads optional?

  orgId: string;
  organization: { orgName: string };
}

export interface TeamDriver {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;

  name: string;
  telephone: string;
  email: string | null;
  address: string | null;
  country: string;
  state: string;
  city: string;
  zip: string | null;
  license: string | null;
}

// mapping object
export const driverDataMap: Record<string, keyof DriverData> = {
  Status: 'status',
  Type: 'type',
  'Driver Name': 'name',
  Telephone: 'telephone',
  Email: 'email',

  Address: 'address',
  City: 'city',
  State: 'state',
  Zip: 'zip',
  Country: 'country',

  License: 'license',
  Employer: 'employerId',
  Notes: 'notes',
};

export const teamDriverDataMap: Record<string, keyof TeamDriver> = {
  'Driver Two Name': 'name',
  'Driver Telephone': 'telephone',
  'Driver Email': 'email',
  'Driver Address': 'address',
  'Driver City': 'city',
  'Driver State': 'state',
  'Driver Zip': 'zip',
  'Driver Country': 'country',
  'Driver License': 'license',
};
