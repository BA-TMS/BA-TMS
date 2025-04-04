'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { TrailerStatus } from '@prisma/client';
import { TrailerFormData } from '@/types/trailerTypes';

// this file contains actions for interacting with the database trailer table

const TRAILER_RELATIONS = {
  organization: { select: { orgName: true } },
  // loads: { select: true }, // will need to handle load relations?
};

export async function getTrailers(organization: string) {
  const trailers = await prisma.trailer.findMany({
    where: {
      organization: {
        orgName: organization,
      },
    },
    orderBy: [
      {
        licensePlate: 'asc',
      },
    ],
    include: TRAILER_RELATIONS,
  });
  return trailers;
}

export async function addTrailer({ trailer }: { trailer: TrailerFormData }) {
  // find organization based on name
  const organization = await getOrganization(trailer.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add trailer :(';
  }
  const resp = await prisma.trailer.create({
    data: {
      status: trailer['Status'] as TrailerStatus,

      type: trailer['Type'],
      licensePlate: trailer['License Plate'],
      plateExpiry: trailer['Plate Expiry'],
      inspectionExpiry: trailer['Inspection Expiry'],

      notes: trailer['Notes'],
      orgId: organization.id,
    },
  });
  return resp;
}

export async function updateTrailer(
  id: string,
  { trailer }: { trailer: Partial<TrailerFormData> }
) {
  // find organization based on name
  const organization = await getOrganization(trailer.orgName as string);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not update trailer :(';
  }
  const resp = await prisma.trailer.update({
    where: { id: id },
    data: {
      status: trailer['Status'] as TrailerStatus,

      type: trailer['Type'],
      licensePlate: trailer['License Plate'],
      plateExpiry: trailer['Plate Expiry'],
      inspectionExpiry: trailer['Inspection Expiry'],
      notes: trailer['Notes'],

      orgId: organization.id,
    },
  });
  return resp;
}
