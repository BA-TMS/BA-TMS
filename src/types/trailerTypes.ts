export interface TrailerFormData {
  orgName: string;
  Status: string;

  Type: string;
  'License Plate': string;
  'Plate Expiry': string;
  'Inspection Expiry': string;
  Notes: string | null;
}

export interface TrailerData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string;

  licensePlate: string | null;
  plateExpiry: Date | null;
  inspectionExpiry: Date | null;
  type: string;
  notes: string | null;

  orgId: string;
  organization: { orgName: string };
}
