'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { Status } from '@prisma/client';
import { TruckFormData } from '@/types/truckTypes';

// this file contains actions for interacting with the database truck table

const TRUCK_RELATIONS = {
  organization: { select: { orgName: true } },
  // loads: { select: true }, // will need to handle load relations?
};

export async function getTrucks(organization: string) {
  const trucks = await prisma.truck.findMany({
    where: {
      organization: {
        orgName: organization,
      },
    },
    orderBy: [
      {
        truckNum: 'asc',
      },
    ],
    include: TRUCK_RELATIONS,
  });
  return trucks;
}

export async function addTruck({ truck }: { truck: TruckFormData }) {
  // find organization based on name
  const organization = await getOrganization(truck.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add truck :(';
  }
  const resp = await prisma.truck.create({
    data: {
      status: truck['Status'] as Status,

      truckNum: truck['Truck Number'],
      licensePlate: truck['License Plate'],
      plateExpiry: truck['Plate Expiry'],
      inspectionExpiry: truck['Inspection Expiry'],
      type: truck['Type'],
      ownership: truck['Ownership'],
      notes: truck['Notes'],

      mileage: truck['Mileage'],
      axels: truck['Axels'],
      fuelType: truck['Fuel Type'],
      year: truck['Year'],
      startDate: truck['Start Date'],
      deactivationDate: truck['Deactivation Date'],
      registeredState: truck['Registered State'],
      weight: truck['Weight'],
      vin: truck['VIN'],
      dotExpiry: truck['DOT Expiry'],

      orgId: organization.id,
    },
  });
  return resp;
}

export async function updateTruck(
  id: string,
  { truck }: { truck: Partial<TruckFormData> }
) {
  // find organization based on name
  const organization = await getOrganization(truck.orgName as string);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not update truck :(';
  }
  const resp = await prisma.truck.update({
    where: { id: id },
    data: {
      status: truck['Status'] as Status,

      truckNum: truck['Truck Number'],
      licensePlate: truck['License Plate'],
      plateExpiry: truck['Plate Expiry'],
      inspectionExpiry: truck['Inspection Expiry'],
      type: truck['Type'],
      ownership: truck['Ownership'],
      notes: truck['Notes'],

      mileage: truck['Mileage'],
      axels: truck['Axels'],
      fuelType: truck['Fuel Type'],
      year: truck['Year'],
      startDate: truck['Start Date'],
      deactivationDate: truck['Deactivation Date'],
      registeredState: truck['Registered State'],
      weight: truck['Weight'],
      vin: truck['VIN'],
      dotExpiry: truck['DOT Expiry'],

      orgId: organization.id,
    },
  });
  return resp;
}
