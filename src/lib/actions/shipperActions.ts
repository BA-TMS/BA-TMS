import { PrismaClient } from '@prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { ShipperData, ShipperFormData } from '@/types/shipperTypes';

// this file contains actions for interacting with the database Shipper table

const prisma = new PrismaClient(); // do we need to start a new prisma client every time?

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
  const resp = await prisma.shipper.create({
    data: {
      name: shipper['Shipper Name'],
      address: shipper['Address'],
      addressAddOn: shipper['Address Line 2'],
      city: shipper['City'],
      state: shipper['State'],
      postCountry: shipper['Country'],
      postCode: shipper['Zip'],
      telCountry: shipper['Country Code'],
      telephone: shipper['Phone Number'],
    },
  });
  return resp;
}

export async function updateShipper(
  id: number,
  { formData }: { formData: Partial<ShipperFormData> }
) {
  const resp = updater(prisma.shipper, id, formData);
  return resp;
}
