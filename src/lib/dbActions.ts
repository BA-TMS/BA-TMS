'use server';

import { PrismaClient } from '@prisma/client';
import { CustomerFormData } from '@/types/customerTypes';
import { LoadFormData } from '@/types/loadTypes';

// regular prisma client
const prisma = new PrismaClient();

const LOAD_RELATIONS = {
  carrier: { select: { name: true } },
  driver: { select: { name: true } },
  customer: { select: { companyName: true } },
  shipper: { select: { name: true } },
  consignee: { select: { name: true } },
};

const CUSTOMER_RELATIONS = {
  factor: { select: { name: true } },
};

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

export async function getCustomer(id) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
  return customer;
}

export async function getCustomers() {
  // const customers = await prisma.customer.findMany();
  const relations = {
    factor: { select: { name: true } },
  };
  const customers = await getter(prisma.customer, relations);
  return customers;
}

export async function getDrivers() {
  const drivers = await prisma.driver.findMany();
  return drivers;
}

export async function getFactors() {
  const factor = await prisma.factor.findMany();
  return factor;
}

export async function getLoad(id: string) {
  const load = await prisma.load.findUnique({
    where: {
      id: id,
    },
  });
  return load;
}

export async function getLoads() {
  const loads = await getter(prisma.load, LOAD_RELATIONS);
  return loads;
}

export async function getOrganizations() {
  const organizations = await getter(prisma.organization, null);
  return organizations;
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

export async function getUsers(parentOrg: string) {
  const users = prisma.user.findMany({
    where: { orgId: parentOrg },
  });
  return users;
}

export async function getUser(targetId: string) {
  const user = prisma.user.findUnique({ where: { id: targetId } });
  return user;
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
  return resp;
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

export async function addCustomer({
  customer,
}: {
  customer: CustomerFormData;
}) {
  const resp = await prisma.customer.create({
    data: {
      status: customer['Status'],
      companyName: customer['Company Name'],
      contactName: customer['Contact Name'],
      secondaryContactName: customer['Secondary Contact Name'],
      contactEmail: customer['Contact Email'],
      contactTelephone: customer['Telephone'],
      contactTollFree: customer['Toll Free'],
      contactFax: customer['Fax'],

      contactAddress: customer['Address'],
      contactAddressField2: customer['Address Line 2'],
      contactAddressField3: customer['Address Line 3'],
      contactCity: customer['City'],
      contactState: customer['State'],
      contactPostCode: customer['Zip'],
      contactCountry: customer['Country'],

      billingAddress: customer['Billing Address'],
      billingAddressField2: customer['Billing Address Line 2'],
      billingAddressField3: customer['Billing Address Line 3'],
      billingCity: customer['Billing City'],
      billingState: customer['Billing State'],
      billingPostCode: customer['Billing Zip'],
      billingCountry: customer['Billing Country'],
      billingEmail: customer['Billing Email'],
      billingTelephone: customer['Billing Telephone'],

      // advanced options
      salesRepName: customer['Sales Rep'],
      currency: customer['Currency'],
      paymentTerms: customer['Payment Terms'],
      creditLimit: customer['Credit Limit'],
      federalID: customer['Federal ID'],
      // empty string will throw an error as the fields must be null
      factorId:
        customer['Factoring Company'] !== ''
          ? customer['Factoring Company']
          : null,
    },
    include: CUSTOMER_RELATIONS, // gives us factor: {name: ___}
  });
  return resp;
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

export async function addLoad({ load }: { load: LoadFormData }) {
  // do not change to dispatched without a carrier
  if (load['Status'] === 'DISPATCHED' && !load['Carrier']) {
    throw new Error(
      'Cannot create a load with status "DISPATCHED" without a carrier.'
    );
  }

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
      deliveryDate: load['Received Date'],
    },
    include: LOAD_RELATIONS,
  });
  return resp;
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
      id: user['ID'],
      email: user['Email'],
      firstName: user['First Name'],
      lastName: user['Last Name'],
      telCountry: user['Country Code'],
      telephone: user['Phone Number'],
      orgId: user['Oganization'],
      role: user['Role'],
      imageURL: user['Image URL'],
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
  id: string,
  { formData }: { formData: CustomerFormData }
) {
  // map to convert formData keys to database keys
  const mapData = (customer: CustomerFormData) => {
    if (!customer) {
      throw new Error('Customer data is undefined or null');
    }

    return {
      status: customer['Status'],
      companyName: customer['Company Name'],
      contactName: customer['Contact Name'],
      secondaryContactName: customer['Secondary Contact Name'],
      contactEmail: customer['Contact Email'],
      contactTelephone: customer['Telephone'],
      contactTollFree: customer['Toll Free'],
      contactFax: customer['Fax'],

      contactAddress: customer['Address'],
      contactAddressField2: customer['Address Line 2'],
      contactAddressField3: customer['Address Line 3'],
      contactCity: customer['City'],
      contactState: customer['State'],
      contactPostCode: customer['Zip'],
      contactCountry: customer['Country'],

      billingAddress: customer['Billing Address'],
      billingAddressField2: customer['Billing Address Line 2'],
      billingAddressField3: customer['Billing Address Line 3'],
      billingCity: customer['Billing City'],
      billingState: customer['Billing State'],
      billingPostCode: customer['Billing Zip'],
      billingCountry: customer['Billing Country'],
      billingEmail: customer['Billing Email'],
      billingTelephone: customer['Billing Telephone'],

      // advanced options
      salesRepName: customer['Sales Rep'],
      currency: customer['Currency'],
      paymentTerms: customer['Payment Terms'],
      creditLimit: customer['Credit Limit'],
      federalID: customer['Federal ID'],
      // empty string will throw an error as the fields must be null
      factorId:
        customer['Factoring Company'] !== ''
          ? customer['Factoring Company']
          : null,
    };
  };

  const mappedCustomer = mapData(formData);

  const resp = await prisma.customer.update({
    where: { id },
    data: {
      ...mappedCustomer,
    },
    include: CUSTOMER_RELATIONS, // gives us factor: {name: ___}
  });

  return resp;
}

export async function updateDriver(
  id: number,
  { formData }: { formData: any }
) {
  const resp = updater(prisma.driver, id, formData);
}

export async function updateLoad(
  id: string,
  { formData }: { formData: Partial<LoadFormData> }
) {
  // do not change to dispatched without a carrier
  if (formData['Status'] === 'DISPATCHED' && !formData['Carrier']) {
    throw new Error(
      'Cannot update a load with status "DISPATCHED" without a carrier.'
    );
  }
  // map to convert formData keys to database keys
  const mapLoadData = (load: Partial<LoadFormData>) => {
    if (!load) {
      throw new Error('Load data is undefined or null');
    }

    return {
      ownerId: load['Owner'],
      loadNum: load['Load Number'],
      payOrderNum: load['Pay Order Number'],
      carrierId: load['Carrier'],
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
