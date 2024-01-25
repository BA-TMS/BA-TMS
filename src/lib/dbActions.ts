'use server';

import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();


/** Return data to populate tables. */
export async function getCarriers() {
  const carriers = await prisma.carrier.findMany();
  return carriers;
}

export async function getConsignees() {
  const consignees = await prisma.consignee.findMany();
  return consignees;
}

export async function getCustomers() {
  const customers = await prisma.customer.findMany();
  return customers;
}

export async function getDrivers() {
  const drivers = await prisma.driver.findMany();
  return drivers;
}

export async function getLoads() {
  const loads = await prisma.load.findMany();
  return loads;
}

export async function getShippers() {
  const shippers = prisma.shipper.findMany();
  return shippers;
}

export async function getUsers() {
  const users = prisma.user.findMany();
  return users;
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
