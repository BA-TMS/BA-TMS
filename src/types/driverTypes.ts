import { Load } from '@prisma/client';

export interface DriverFormData {
  Status: 'ACTIVE' | 'INACTIVE';
  'Driver Name': string;
  Telephone: string;
  Email: string | null;

  City: string;
  State: string;
  Zip: string;
  Country: string;

  License: string | null;
  Employer: string | null;
  Notes: string | null;
}

export interface DriverData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string; // "ACTIVE" | "INACTIVE" ??
  name: string;
  telephone: string;
  email: string | null;
  country: string;
  state: string;
  city: string;
  zip: string | null;
  license: string | null;
  notes: string | null;

  // are drivers linked with carriers always/ sometimes/ never?
  employerId: string | null;
  employer: { carrierName: string } | null;

  loads?: Load[]; // are loads optional?

  orgId: string;
  organization: { orgName: string };
}
