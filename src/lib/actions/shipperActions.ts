'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { ShipperFormData } from '@/types/shipperTypes';
import { Status } from '@prisma/client';

// this file contains actions for interacting with the database Shipper table

const SHIPPER_RELATIONS = {
  organization: { select: { orgName: true } },
  // loads: { select: true }, // will need to handle load relations?
  consignee: { select: { name: true } },
};

export async function getShippers(organization: string) {
  const shippers = await prisma.shipper.findMany({
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
    include: SHIPPER_RELATIONS,
  });
  console.log(shippers);
  return shippers;
}

export async function addShipper({ shipper }: { shipper: ShipperFormData }) {
  // find organization based on name
  const organization = await getOrganization(shipper.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add shipper :(';
  }

  const resp = await prisma.shipper.create({
    data: {
      status: shipper['Status'] as Status,

      name: shipper['Shipper Name'],
      address: shipper['Address'],
      addressField2: shipper['Address Line 2'],
      addressField3: shipper['Address Line 3'],
      city: shipper['City'],
      state: shipper['State'],
      postCode: shipper['Zip'],
      postCountry: shipper['Country'],

      contactName: shipper['Contact'],
      contactEmail: shipper['Email'],
      telephone: shipper['Telephone'],
      tollFree: shipper['Toll Free'],

      shippingHours: shipper['Shipping Hours'],
      appointments: shipper['Appointments'],
      intersections: shipper['Intersections'],

      notes: shipper['Notes'],

      orgId: organization.id,
    },
  });
  return resp;
}

export async function updateShipper(
  id: number,
  { formData }: { formData: Partial<ShipperFormData> }
) {
  const resp = formData;
  return resp;
}
