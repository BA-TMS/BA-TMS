import { PrismaClient } from '@prisma/client';
import { getOrganization } from '@/lib/dbActions';

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
