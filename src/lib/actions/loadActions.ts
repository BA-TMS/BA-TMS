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

  const resp = await prisma.load.create({
    data: {
      orgId: load['Owner'],
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
    },
    include: LOAD_RELATIONS,
  });
  return resp;
}

export async function updateLoad(
  id: string,
  { formData }: { formData: Partial<LoadFormData> }
) {
  // do not change to dispatched without a carrier
  if (formData['Status'] === 'DISPATCHED' && !formData['Carrier']) {
    throw new Error(
      'Cannot update a load status to "Dispatched" without a carrier.'
    );
  }
  // map to convert formData keys to database keys
  const mapLoadData = (load: Partial<LoadFormData>) => {
    if (!load) {
      throw new Error('Load data is undefined or null');
    }

    return {
      orgId: load['Owner'],
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
    };
  };

  const mappedLoad = mapLoadData(formData);

  const resp = await prisma.load.update({
    where: { id },
    data: {
      ...mappedLoad,
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
