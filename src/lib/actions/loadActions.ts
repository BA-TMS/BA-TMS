'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { LoadFormData } from '@/types/loadTypes';

const LOAD_RELATIONS = {
  carrier: { select: { carrierName: true } },
  driver: { select: { name: true } },
  customer: { select: { companyName: true } },
  shipper: { select: { name: true } },
  consignee: { select: { name: true } },
};

export async function getLoad(id: string) {
  const load = await prisma.load.findUnique({
    where: {
      id: id,
    },
  });
  return load;
}

export async function getLoads(organization: string) {
  const loads = await prisma.load.findMany({
    where: {
      organization: {
        orgName: organization,
      },
    },
    orderBy: [
      {
        loadNum: 'asc',
      },
    ],
    include: LOAD_RELATIONS,
  });
  return loads;
}

export async function addLoad({ load }: { load: LoadFormData }) {
  // do not change to dispatched without a carrier
  if (load['Status'] === 'DISPATCHED' && !load['Carrier']) {
    throw new Error(
      'Cannot create a load with status of "Dispatched" without a carrier.'
    );
  }

  // find organization based on name
  const organization = await getOrganization(load.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add load :(';
  }

  const resp = await prisma.load.create({
    data: {
      loadNum: load['Load Number'],
      payOrderNum: load['Pay Order Number'],
      carrierId: load['Carrier'],
      driverId: load['Driver'],
      customerId: load['Customer'],
      originId: load['Shipper'],
      destId: load['Consignee'],
      status: load['Status'],
      shipDate: load['Ship Date'],
      deliveryDate: load['Received Date'],

      orgId: organization.id,
    },
    include: LOAD_RELATIONS,
  });
  return resp;
}

export async function updateLoad(
  id: string,
  { load }: { load: Partial<LoadFormData> }
) {
  // do not change to dispatched without a carrier
  if (load['Status'] === 'DISPATCHED' && !load['Carrier']) {
    throw new Error(
      'Cannot update a load status to "Dispatched" without a carrier.'
    );
  }

  // find organization based on name
  const organization = await getOrganization(load.orgName as string);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add load :(';
  }

  const resp = await prisma.load.update({
    where: { id: id },
    data: {
      loadNum: load['Load Number'],
      payOrderNum: load['Pay Order Number'],
      carrierId: load['Carrier'] ? load['Carrier'] : null,
      driverId: load['Driver'] ? load['Driver'] : null,
      customerId: load['Customer'],
      originId: load['Shipper'] ? load['Shipper'] : null,
      destId: load['Consignee'] ? load['Consignee'] : null,
      status: load['Status'],
      shipDate: load['Ship Date'],
      deliveryDate: load['Received Date'],
      orgId: organization.id,
    },
    include: LOAD_RELATIONS,
  });

  return resp;
}

export async function deleteLoad(id: string) {
  return prisma.load.delete({
    where: {
      id: id,
    },
  });
}
