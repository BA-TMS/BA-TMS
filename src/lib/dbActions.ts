/* eslint-disable indent */
'use server';

import prisma from '@util/prisma/client';
import { PrismaClient, DriverType } from '@prisma/client';
import { DriverFormData } from '@/types/driverTypes';
import { BilleeFormData } from '@/types/billeeTypes';
import { TrailerFormData } from '@/types/trailerTypes';
import { TruckFormData } from '@/types/truckTypes';
import { AccountPreferences } from '@/types/accountTypes';

// This file contains different server actions for interracting with the database via Prisma client

const DRIVER_RELATIONS = {
  organization: { select: { orgName: true } },
  // loads: { select: true }, // will need to handle load relations
  employer: { select: { carrierName: true } },
  driverTwo: true,
};

// Generic type for Prisma model

// Generic type for Prisma relations object
type PrismaRelation<Model> = {
  [key in keyof Model]?: {
    select: Record<string, boolean>;
  };
};

/** Get existing table data */
async function getter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any, // can't figure out how to type this - it's going to be any of our Prisma models
  relations: PrismaRelation<PrismaClient | null>
) {
  const resp = await table.findMany({
    include: relations,
  });
  return resp;
}

export async function getDriver(id: string) {
  const driver = await prisma.driver.findUnique({
    where: {
      id: id,
    },
    include: DRIVER_RELATIONS,
  });
  return driver;
}

export async function getDrivers(organization: string) {
  const drivers = await prisma.driver.findMany({
    where: {
      organization: {
        orgName: organization,
      },
    },
    include: DRIVER_RELATIONS,
  });
  return drivers;
}

export async function getOrganization(orgName: string) {
  const organization = await prisma.organization.findFirst({
    where: {
      orgName: orgName,
    },
    select: {
      id: true,
    },
  });
  return organization;
}

export async function getOrganizations() {
  const organizations = await getter(prisma.organization, null);
  return organizations;
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

export async function addDriver({ driver }: { driver: DriverFormData }) {
  // find organization based on name
  const organization = await prisma.organization.findFirst({
    where: {
      orgName: driver.orgName,
    },
    select: {
      id: true,
    },
  });

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not create driver';
  }

  if (driver['Type'] === 'TEAM') {
    const resp = await prisma.driver.create({
      data: {
        status: driver['Status'],
        type: driver['Type'] as DriverType,

        name: driver['Driver Name'],
        telephone: driver['Telephone'],
        email: driver['Email'],
        address: driver['Address'],
        country: driver['Country'],
        state: driver['State'],
        city: driver['City'],
        zip: driver['Zip'],

        license: driver['License'],
        employerId: driver['Employer'],
        orgId: organization.id,
        // loads: driver['Loads'], // do this functionality
        notes: driver['Notes'] || null,

        driverTwo: {
          create: {
            name: driver['Driver Two Name'],
            telephone: driver['Driver Telephone'],
            email: driver['Driver Email'],
            address: driver['Driver Address'],
            country: driver['Driver Country'],
            state: driver['Driver State'],
            city: driver['Driver City'],
            zip: driver['Driver Zip'],
            license: driver['Driver License'],
          },
        },
      },
      include: DRIVER_RELATIONS,
    });
    return resp;
  } else {
    const resp = await prisma.driver.create({
      data: {
        status: driver['Status'],
        type: driver['Type'] as DriverType,

        name: driver['Driver Name'],
        telephone: driver['Telephone'],
        email: driver['Email'],
        address: driver['Address'],
        country: driver['Country'],
        state: driver['State'],
        city: driver['City'],
        zip: driver['Zip'],

        license: driver['License'],
        employerId: driver['Employer'],
        orgId: organization.id,
        // loads: driver['Loads'], // do this functionality
        notes: driver['Notes'] || null,

        driverTwo: undefined,
      },
      include: DRIVER_RELATIONS,
    });
    return resp;
  }
}

export async function addThirdParty({ billee }: { billee: BilleeFormData }) {
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
  return resp;
}

export async function addTrailer({ trailer }: { trailer: TrailerFormData }) {
  const resp = await prisma.trailer.create({
    data: {
      licensePlate: trailer['License Plate'],
      plateExpiry: trailer['Plate Expiry'],
      inspectionExpiry: trailer['Inspection Expiry'],
      type: trailer['Trailer Type'],
      status: trailer['Status'],
    },
  });
  return resp;
}

export async function addTruck({ truck }: { truck: TruckFormData }) {
  const resp = await prisma.truck.create({
    data: {
      truckNum: truck['Truck Number'],
      licensePlate: truck['License Plate'], // should be optional?
      type: truck['Truck Type'],
      plateExpiry: truck['Plate Expiry'],
      inspectionExpiry: truck['Inspection Expiry'],
      iftaLicensed: truck['IFTA Licensed'],
    },
  });
  return resp;
}

/** Update row */

export async function updateDriver(
  id: string,
  { driver }: { driver: DriverFormData }
) {
  // find organization based on name
  const organization = await prisma.organization.findFirst({
    where: {
      orgName: driver.orgName,
    },
    select: {
      id: true,
    },
  });

  // TODO: Better error handling
  if (organization === null) {
    throw 'Can not update driver';
  }

  // if type is single

  const resp = await prisma.driver.update({
    where: { id: id },
    data: {
      status: driver['Status'],
      type: driver['Type'],

      name: driver['Driver Name'],
      telephone: driver['Telephone'],
      email: driver['Email'],
      address: driver['Address'],
      city: driver['City'],
      state: driver['State'],
      country: driver['Country'],
      zip: driver['Zip'],
      license: driver['License'],
      // loads: driver['Loads'],
      orgId: organization.id,
      employerId: driver['Employer'],
      notes: driver['Notes'],

      // changing driver type from team to single
      // the formatting is weird on this
      driverTwo:
        driver['Type'] === 'SINGLE'
          ? { delete: driver['Driver Two Name'] ? true : undefined } // if there was a driverTwo, delete
          : {
              upsert: {
                create: {
                  name: driver['Driver Two Name'],
                  telephone: driver['Driver Telephone'],
                  email: driver['Driver Email'],
                  address: driver['Driver Address'],
                  country: driver['Driver Country'],
                  state: driver['Driver State'],
                  city: driver['Driver City'],
                  zip: driver['Driver Zip'],
                  license: driver['Driver License'],
                },
                update: {
                  name: driver['Driver Two Name'],
                  telephone: driver['Driver Telephone'],
                  email: driver['Driver Email'],
                  address: driver['Driver Address'],
                  country: driver['Driver Country'],
                  state: driver['Driver State'],
                  city: driver['Driver City'],
                  zip: driver['Driver Zip'],
                  license: driver['Driver License'],
                },
              },
            },
    },
    include: DRIVER_RELATIONS,
  });
  return resp;
}

export async function updateAccountPreferences(prefs: AccountPreferences) {
  await prisma.accountPreferences.update({
    where: {
      id: '0',
    },
    data: prefs,
  });
}
