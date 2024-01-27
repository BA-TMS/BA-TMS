'use server';

import { PrismaClient } from '@prisma/client';
import { ConsigneeFormDataState } from '@/types/formTypes';

let prisma = new PrismaClient();

/** Get existing table data */
async function getter(table: any, relations: any) {
  const resp = await table.findMany({
    include: relations
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

export async function getLoads() {
  const relations = {
    carrier: {select: {name: true}},
    driver: {select: {name: true}},
    customer: {select: {name: true}},
    shipper: {select: {name: true}},
    consignee: {select: {name: true}}
  };
  const loads = await getter(prisma.load, relations);
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

/** Add new entries to tables. */
// TODO: Create a central location for form types to replace any.
// TODO: Read resp. to confirm success of write.
async function creater(table: any, insertData: any) {
  const resp = await table.create({
    data: insertData,
  });
  return resp;
}

export async function addCarrier(carrier: any) {
  const resp = await prisma.carrier.create({
    data: {
      name: carrier.name,
      address: carrier.address,
      addressAddOn: null,
      city: carrier.city,
      state: carrier.state,
      postCountry: 'USA',
      postCode: carrier.zip,
      telCountry: 1,
      telephone: carrier.telephone,
      dotId: carrier.totid,
      factorId: null,
    },
  });
}

export async function addConsignee(consignee: ConsigneeFormDataState) {
  // const resp = await prisma.consignee.create({
  //   data: {
  //     name: consignee.consigneeName,
  //     address: consignee.address,
  //     city: consignee.city,
  //     state: consignee.state,
  //     postCountry: consignee.country,
  //     postCode: consignee.zip,
  //     telCountry: 1,
  //     telephone: consignee.phone,
  //   },
  // });

  const insertData = {
    name: consignee.consigneeName,
    address: consignee.address,
    city: consignee.city,
    state: consignee.state,
    postCountry: consignee.country,
    postCode: consignee.zip,
    telCountry: 1,
    telephone: consignee.phone,
  }
  const resp = creater(prisma.consignee, insertData);

  console.log(resp);
}

export async function addCustomer(customer: any) {
  const resp = await prisma.customer.create({
    data: {
      name: customer.name,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      postCountry: customer.country,
      postCode: customer.zip,
      telCountry: 1,
      telephone: customer.phone,
    },
  });
}

export async function addDriver(driver: any) {
  const resp = await prisma.driver.create({
    data: {
      name: driver.name,
      license: driver.license,
      telCountry: 1,
      telephone: driver.telephone,
      employerId: driver.employerId,
    },
  });
}

export async function addLoad(load: any) {
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

export async function addShipper(shipper: any) {
  const resp = await prisma.shipper.create({
    data: {
      name: shipper.name,
      address: shipper.address,
      addressAddOn: shipper.addressAddOn,
      city: shipper.city,
      state: shipper.state,
      postCountry: shipper.postCountry,
      postCode: shipper.postCode,
      telCountry: shipper.telCountry,
      telephone: shipper.telephone,
    },
  });
}

export async function addUser(user: any) {
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

export async function updateCarrier(id: number, formData: any) {
  const resp = updater(prisma.carrier, id, formData);
}

export async function updateConsignee(id: number, formData: any) {
  const resp = updater(prisma.consignee, id, formData);
}

export async function updateCustomer(id: number, formData: any) {
  const resp = updater(prisma.customer, id, formData);
}

export async function updateDriver(id: number, formData: any) {
  const resp = updater(prisma.driver, id, formData);
}

export async function updateLoad(id: number, formData: any) {
  const resp = updater(prisma.load, id, formData);
}

export async function updateShipper(id: number, formData: any) {
  const resp = updater(prisma.shipper, id, formData);
}

export async function updateUser(id: number, formData: any) {
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

export async function deleteConsignee(id:number) {
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
