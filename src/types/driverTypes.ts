import { Load } from '@prisma/client';

export interface DriverFormData {
  'Driver Name': string;
  'Country Code': string;
  'Phone Number': string;
  'License Number': string;
  Employer: string;
  Notes?: string | null;
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
