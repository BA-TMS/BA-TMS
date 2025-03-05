export interface TruckFormData {
  orgName: string;
  Status: string;

  'Truck Number': string;
  'License Plate': string | null;
  'Plate Expiry': Date | null;
  'Inspection Expiry': Date | null;
  Type: string | null;
  Ownership: string | null;
  Notes: string | null;

  Mileage: string | null;
  Axels: string | null;
  'Fuel Type': string | null;
  Year: string | null;
  'Start Date': Date | null;
  'Deactivation Date': Date | null;
  IFTA: boolean;
  'Registered State': string | null;
  Weight: string | null;
  VIN: string | null;
  'DOT Expiry': Date | null;
}

export interface TruckData {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: string;

  truckNum: string;
  licensePlate: string | null;
  plateExpiry: Date | null;
  inspectionExpiry: Date | null;
  type: string | null;
  ownership: string | null;
  notes: string | null;

  orgId: string;
  organization: { orgName: string };

  mileage: string | null;
  axels: string | null;
  fuelType: string | null;
  year: string | null;
  startDate: Date | null;
  deactivationDate: Date | null;
  ifta: boolean | null;
  registeredState: string | null;
  weight: string | null;
  vin: string | null;
  dotExpiry: Date | null;
}

export const truckDataMap: Record<string, keyof TruckData> = {
  Status: 'status',

  'Truck Number': 'truckNum',
  'License Plate': 'licensePlate',
  'Plate Expiry': 'plateExpiry',
  'Inspection Expiry': 'inspectionExpiry',
  Type: 'type',
  Ownership: 'ownership',
  Notes: 'notes',

  Mileage: 'mileage',
  Axels: 'axels',
  'Fuel Type': 'fuelType',
  Year: 'year',
  'Start Date': 'startDate',
  'Deactivation Date': 'deactivationDate',
  IFTA: 'ifta',
  'Registered State': 'registeredState',
  Weight: 'weight',
  VIN: 'vin',
  'DOT Expiry': 'dotExpiry',
};
