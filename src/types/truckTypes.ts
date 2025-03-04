export interface TruckFormData {
  'Truck Number': string;
  'License Plate': string;
  'Truck Type': string;
  'Plate Expiry': string;
  'Inspection Expiry': string;
  'IFTA Licensed': boolean | undefined;
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

  orgId: string;
  organization: { orgName: string };

  mileage: string | null;
  axels: string | null;
  fuelType: string | null;
  year: string | null;
  startDate: Date | null;
  deactivationDate: Date | null;
  registeredState: string | null;
  weight: string | null;
  vin: string | null;
  dotExpiry: Date | null;
}
