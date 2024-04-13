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

export async function getBrokers() {
  const brokers = await prisma.broker.findMany();
  return brokers;
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

export async function getOrganizations() {
  const organizations = prisma.organization.findMany();
  return organizations;
}

export async function getOrgs() {
  const orgs = await getter(prisma.organization, null);
  return orgs;
}

export async function getShippers() {
  const shippers = prisma.shipper.findMany();
  return shippers;
}

export async function getThirdParty() {
  const thirdParty = await prisma.billee.findMany();
  return thirdParty;
}

export async function getTrailers() {
  const trailers = prisma.trailer.findMany();
  return trailers;
}

export async function getTrucks() {
  const trucks = prisma.truck.findMany();
  return trucks;
}

export async function getUsers() {
  const users = prisma.user.findMany();
  return users;
}

export async function getAccountPreferences() {
  return await prisma.accountPreferences.findUnique({ where: { id: '0' } });
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

export async function addBroker({ broker }: { broker: any }) {
  const resp = await prisma.broker.create({
    data: {
      name: broker['Broker Name'],
      crossing: broker['Crossing'],
      address: broker['Address'],
      addressAddOn: broker['Address Line 2'] || null, // Optional field
      city: broker['City'],
      state: broker['State'],
      postCountry: broker['Country'],
      postCode: broker['Zip'],
      telCountry: broker['Country Code'],
      telephone: broker['Phone Number'],
      // notes: carrier['Notes'] || null, // optional field, notes not in table yet
    },
  });
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
      ownerId: load['Owner'],
      loadNum: load['Load Number'],
      payOrderNum: load['Pay Order Number'],
      carrierId: load['Carrier'],
      driverId: load['Driver'],
      customerId: load['Customer'],
      originId: load['Shipper'],
      destId: load['Consignee'],
      status: load['Status'],
      shipDate: load['Ship Date'],
      deliveryDate: load['Received Date']
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

export async function addThirdParty({ billee }: { billee: any }) {
  const resp = await prisma.billee.create({
    data: {
      name: billee['Third Party Name'],
      address: billee['Address'],
      addressAddOn: billee['Address Line 2'],
      city: billee['City'],
      state: billee['State'],
      postCountry: billee['Country'],
      postCode: billee['Zip'],
      telCountry: billee['Country Code'],
      telephone: billee['Phone Number'],
    },
  });
}

export async function addTrailer({ trailer }: { trailer: any }) {
  const resp = await prisma.trailer.create({
    data: {
      licensePlate: trailer['License Plate'],
      plateExpiry: trailer['Plate Expiry'],
      inspectionExpiry: trailer['Inspection Expiry'],
      type: trailer['Trailer Type'],
      status: trailer['Status'],
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
      email: user['Email'],
      password: user['Password'],
      orgId: user['Organization'],
      role: user['Role'],
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

export async function updateAccountPreferences(prefs: any) {
  await prisma.accountPreferences.update({
    where: {
      id: '0',
    },
    data: prefs,
  });
}

/** Delete rows */
async function deleter(table: any, targetId: string) {
  const resp = table.delete({
    where: {
      id: targetId,
    },
  });
  return resp;
}

export async function deleteCarrier(id: string) {
  const resp = deleter(prisma.carrier, id);
}

export async function deleteConsignee(id: string) {
  const resp = deleter(prisma.consignee, id);
}

export async function deleteCustomer(id: string) {
  const resp = deleter(prisma.customer, id);
}

export async function deleteDriver(id: string) {
  const resp = deleter(prisma.driver, id);
}

export async function deleteLoad(id: string) {
  const resp = deleter(prisma.load, id);
}

export async function deleteShipper(id: string) {
  const resp = deleter(prisma.shipper, id);
}

export async function deleteUser(id: string) {
  const resp = deleter(prisma.user, id);
}

export async function deleteThirdParty(id: string) {
  const resp = deleter(prisma.billee, id);
}
