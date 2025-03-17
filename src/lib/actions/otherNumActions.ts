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
    throw 'can not add other number :(';
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

export async function updateOtherNum(
  id: string,
  { otherNum }: { otherNum: Partial<NumFormData> }
) {
  // find organization based on name
  const organization = await getOrganization(otherNum.orgName as string);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not update other number :(';
  }
  const resp = await prisma.numbers.update({
    where: { id: id },
    data: {
      status: otherNum['Status'] as Status,
      name: otherNum['Name'],
      dispatch: otherNum['dispatch'],
      orgId: organization.id,
    },
  });
  return resp;
}
