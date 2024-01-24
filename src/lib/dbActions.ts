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