'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { Status } from '@prisma/client';
import { NumFormData } from '@/types/otherNumTypes';

// this file contains actions for interacting with the database otherNum table

const NUMBER_RELATIONS = {
  organization: { select: { orgName: true } },
  // loads: { select: true }, // will need to handle load relations?
};

export async function getOtherNums(organization: string) {
  const numbers = await prisma.numbers.findMany({
    where: {
      organization: {
        orgName: organization,
      },
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
    include: NUMBER_RELATIONS,
  });
  return numbers;
}

export async function addOtherNum({ otherNum }: { otherNum: NumFormData }) {
  // find organization based on name
  const organization = await getOrganization(otherNum.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add otherNum :(';
  }
  const resp = await prisma.numbers.create({
    data: {
      status: otherNum['Status'] as Status,
      name: otherNum['Name'],
      dispatch: otherNum['dispatch'],
      orgId: organization.id,
    },
  });
  return resp;
}

// export async function updateotherNum(
//   id: string,
//   { otherNum }: { otherNum: Partial<otherNumFormData> }
// ) {
//   // find organization based on name
//   const organization = await getOrganization(otherNum.orgName as string);

//   // TODO: Better error handling
//   if (organization === null) {
//     throw 'can not update otherNum :(';
//   }
//   const resp = await prisma.otherNum.update({
//     where: { id: id },
//     data: {
//       status: otherNum['Status'] as Status,

//       otherNumNum: otherNum['otherNum Number'],
//       licensePlate: otherNum['License Plate'],
//       plateExpiry: otherNum['Plate Expiry'],
//       inspectionExpiry: otherNum['Inspection Expiry'],
//       type: otherNum['Type'],
//       ownership: otherNum['Ownership'],
//       notes: otherNum['Notes'],

//       mileage: otherNum['Mileage'],
//       axels: otherNum['Axels'],
//       fuelType: otherNum['Fuel Type'],
//       year: otherNum['Year'],
//       startDate: otherNum['Start Date'],
//       deactivationDate: otherNum['Deactivation Date'],
//       registeredState: otherNum['Registered State'],
//       weight: otherNum['Weight'],
//       vin: otherNum['VIN'],
//       dotExpiry: otherNum['DOT Expiry'],

//       orgId: organization.id,
//     },
//   });
//   return resp;
// }
