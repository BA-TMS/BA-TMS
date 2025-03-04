'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { Prisma, Status } from '@prisma/client';
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
  const resp = await prisma.truck.create({
    data: {
      truckNum: truck['Truck Number'],
      licensePlate: truck['License Plate'], // should be optional?
      type: truck['Truck Type'],
      plateExpiry: truck['Plate Expiry'],
      inspectionExpiry: truck['Inspection Expiry'],
      iftaLicensed: truck['IFTA Licensed'],
    },
  });
  return resp;
}
