'use server';

import { PrismaClient } from '@prisma/client';
import { ConsigneeFormDataState } from '@/types/formTypes';

const prisma = new PrismaClient(); // TODO: Is this better off as a const?

/** Get existing table data */
async function getter(table: any, relations: any) {
  const resp = await table.findMany({
    include: relations,
  });
  return resp;
}

export async function getCarriers() {
  const carriers = await prisma.carrier.findMany();
  return carriers;
}

export async function getConsignees() {
  const consignees = await getter(prisma.consignee, null);
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

export async function getFactor() {
  const factor = await prisma.factor.findMany();
  return factor;
}

export async function getLoads() {
  const relations = {
    carrier: { select: { name: true } },
    driver: { select: { name: true } },
    customer: { select: { name: true } },
    shipper: { select: { name: true } },
    consignee: { select: { name: true } },
  };
  const loads = await getter(prisma.load, relations);
  return loads;
}

export async function getShippers() {
  const shippers = prisma.shipper.findMany();
  return shippers;
}

export async function getTrucks() {
  const trucks = prisma.truck.findMany();
  return trucks;
}

export async function getUsers() {
  const users = prisma.user.findMany();
  return users;
}

/** Add new entries to tables. */
// TODO: Create a central location for form types to replace any.
// TODO: Read resp. to confirm success of write.
async function creater(table: any, insertData: any) {
  const resp = await table.create({
    data: insertData,
  });
  return resp;
}

export async function addCarrier({ carrier }: { carrier: any }) {
  const resp = await prisma.carrier.create({
    data: {
      name: carrier['Carrier Name'],
      address: carrier['Address'],
      addressAddOn: carrier['Address Line 2'] || null, // Optional field
      city: carrier['City'],
      state: carrier['State'],
      postCountry: carrier['Country'],
      postCode: carrier['Zip'],
      telCountry: carrier['Country Code'],
      telephone: carrier['Phone Number'],
      dotId: carrier['DOT ID'],
      factorId: carrier['Factor ID'],
      taxId: carrier['Tax ID'],
      // notes: carrier['Notes'] || null, // optional field, notes not in table yet
    },
  });
}

export async function addConsignee({ consignee }: { consignee: any }) {
  const resp = await prisma.consignee.create({
    data: {
      name: consignee['Consignee Name'],
      address: consignee['Address'],
      addressAddOn: consignee['Address Line 2'] || null, // Optional field
      city: consignee['City'],
      state: consignee['State'],
      postCountry: consignee['Country'],
      postCode: consignee['Zip'],
      telCountry: consignee['Country Code'],
      telephone: consignee['Phone Number'],
      // contact: consignee['Contact Name'], //n not in db table yet
      // notes: consignee['Notes'] || null, // optional field, notes not in db table yet
    },
  });
}

export async function addCustomer({ customer }: { customer: any }) {
  const resp = await prisma.customer.create({
    data: {
      name: customer['Customer Name'],
      address: customer['Address'],
      addressAddOn: customer['Address Line 2'] || null, // Optional field
      city: customer['City'],
      state: customer['State'],
      postCountry: customer['Country'],
      postCode: customer['Zip'],
      telCountry: customer['Country Code'],
      telephone: customer['Phone Number'],
      // email: customer['Email'] // do we need email for customer?
      // notes: customer['Notes'] || null, // optional field, notes not in db table yet
    },
  });
}

export async function addDriver({ driver }: { driver: any }) {
  const resp = await prisma.driver.create({
    data: {
      name: driver['Driver Name'],
      telCountry: driver['Country Code'],
      telephone: driver['Phone Number'],
      license: driver['License Number'] || null, // optional
      employerId: driver['Employer'],
      // notes: carrier['Notes'] || null, // optional field, notes not in table yet
    },
  });
}

export async function addFactoringCo({ factor }: { factor: any }) {
  const resp = await prisma.factor.create({
    data: {
      name: factor['Factoring Company Name'],
      address: factor['Address'],
      addressAddOn: factor['Address Line 2'] || null, // Optional field
      city: factor['City'],
      state: factor['State'],
      postCountry: factor['Country'],
      postCode: factor['Zip'],
      telCountry: factor['Country Code'],
      telephone: factor['Phone Number'],
      // notes: factor['Notes'] || null, // optional field, notes not in db table yet
    },
  });
}

export async function addLoad({ load }: { load: any }) {
  const resp = await prisma.load.create({
    data: {
      ownerId: load.ownerId,
      loadNum: load.number,
      carrierId: load.carrier,
      driverId: load.driver,
      customerId: load.customerId,
      originId: load.originId,
      destId: load.destId,
      status: load.status,
    },
  });
}

export async function addShipper({ shipper }: { shipper: any }) {
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
}

export async function addTruck({ truck }: { truck: any }) {
  const resp = await prisma.truck.create({
    data: {
      truckNum: truck['Truck Number'],
      licensePlate: truck['License Plate'] || null, // Optional field
      type: truck['Truck Type'],
      plateExpiry: truck['Plate Expiry'],
      inspectionExpiry: truck['Inspection Expiry'],
      iftaLicensed: truck['IFTA Licensed'],
    },
  });
}

export async function addUser({ user }: { user: any }) {
  const resp = await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
      orgId: user.orgId,
      role: user.role,
    },
  });
}

/** Update row */
async function updater(table: any, targetId: number, upateData: any) {
  const resp = table.update({
    where: {
      id: targetId,
    },
    data: upateData,
  });
  return resp;
}

export async function updateCarrier(
  id: number,
  { formData }: { formData: any }
) {
  const resp = updater(prisma.carrier, id, formData);
}

export async function updateConsignee(
  id: number,
  { formData }: { formData: any }
) {
  const resp = updater(prisma.consignee, id, formData);
}

export async function updateCustomer(
  id: number,
  { formData }: { formData: any }
) {
  const resp = updater(prisma.customer, id, formData);
}

export async function updateDriver(
  id: number,
  { formData }: { formData: any }
) {
  const resp = updater(prisma.driver, id, formData);
}

export async function updateLoad(id: number, { formData }: { formData: any }) {
  const resp = updater(prisma.load, id, formData);
}

export async function updateShipper(
  id: number,
  { formData }: { formData: any }
) {
  const resp = updater(prisma.shipper, id, formData);
}

export async function updateUser(id: number, { formData }: { formData: any }) {
  const resp = updater(prisma.user, id, formData);
}

/** Delete rows */
async function deleter(table: any, targetId: number) {
  const resp = table.delete({
    where: {
      id: targetId,
    },
  });
  return resp;
}

export async function deleteCarrier(id: number) {
  const resp = deleter(prisma.carrier, id);
}

export async function deleteConsignee(id: number) {
  const resp = deleter(prisma.consignee, id);
}

export async function deleteCustomer(id: number) {
  const resp = deleter(prisma.customer, id);
}

export async function deleteDriver(id: number) {
  const resp = deleter(prisma.driver, id);
}

export async function deleteLoad(id: number) {
  const resp = deleter(prisma.load, id);
}

export async function deleteShipper(id: number) {
  const resp = deleter(prisma.shipper, id);
}

export async function deleteUser(id: number) {
  const resp = deleter(prisma.user, id);
}
