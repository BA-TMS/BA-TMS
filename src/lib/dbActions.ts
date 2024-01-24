'use server';

import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

export async function customers() {
  const customers = await prisma.customer.findMany();
  return customers;
}

export async function loads() {
  const loads = await prisma.load.findMany();
  return loads;
}

export async function addConsignee(consignee: {}) {
  // console.log(consignee);
  // TODO: Move the form data interface from the form to. . . some central location and import it here.
  const resp = await prisma.consignee.create({
    data: {
      name: consignee.consigneeName,
      address: consignee.address,
      city: consignee.city,
      state: consignee.state,
      postCountry: consignee.country,
      postCode: consignee.zip,
      telCountry: 1,
      telephone: consignee.phone,
    },
  });

  console.log(resp);
}
