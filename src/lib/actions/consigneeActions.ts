'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { ConsigneeFormData } from '@/types/consigneeTypes';
import { Prisma, Status } from '@prisma/client';

// this file contains actions for interacting with the database consignee table

const CONSIGNEE_RELATIONS = {
  organization: { select: { orgName: true } },
  // loads: { select: true }, // will need to handle load relations?
  shipper: { select: { name: true } },
};

export async function getConsignees(organization: string) {
  const consignees = await prisma.consignee.findMany({
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
    include: CONSIGNEE_RELATIONS,
  });
  return consignees;
}

export async function addConsignee({
  consignee,
}: {
  consignee: ConsigneeFormData;
}) {
  // find organization based on name
  const organization = await getOrganization(consignee.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add consignee :(';
  }

  const data: Prisma.ConsigneeCreateInput = {
    status: consignee['Status'] as Status,

    name: consignee['Consignee Name'],
    address: consignee['Address'],
    addressField2: consignee['Address Line 2'],
    addressField3: consignee['Address Line 3'],
    city: consignee['City'],
    state: consignee['State'],
    postCode: consignee['Zip'],
    postCountry: consignee['Country'],

    contactName: consignee['Contact'],
    contactEmail: consignee['Email'],
    telephone: consignee['Telephone'],
    tollFree: consignee['Toll Free'],

    recievingHours: consignee['Recieving Hours'],
    appointments: consignee['Appointments'],
    intersections: consignee['Intersections'],

    notes: consignee['Notes'],

    organization: {
      connect: { id: organization.id },
    },
  };

  // Conditionally add the shipper relation
  if (consignee.shipper) {
    data.shipper = {
      create: {
        status: consignee['Status'] as Status,

        name: consignee['Consignee Name'],
        address: consignee['Address'],
        addressField2: consignee['Address Line 2'],
        addressField3: consignee['Address Line 3'],
        city: consignee['City'],
        state: consignee['State'],
        postCode: consignee['Zip'],
        postCountry: consignee['Country'],

        contactName: consignee['Contact'],
        contactEmail: consignee['Email'],
        telephone: consignee['Telephone'],
        tollFree: consignee['Toll Free'],

        shippingHours: consignee['Recieving Hours'],
        appointments: consignee['Appointments'],
        intersections: consignee['Intersections'],

        notes: consignee['Notes'],

        organization: {
          connect: { id: organization.id },
        },
      },
    };
  }

  const resp = await prisma.consignee.create({ data });
  return resp;
}

export async function updateConsignee(
  id: string,
  { consignee }: { consignee: Partial<ConsigneeFormData> }
) {
  // find organization based on name
  const organization = await getOrganization(consignee.orgName as string); // come back to

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not update consignee :(';
  }

  const data: Prisma.ConsigneeUpdateInput = {
    status: consignee['Status'] as Status,
    name: consignee['Consignee Name'],
    address: consignee['Address'],
    addressField2: consignee['Address Line 2'],
    addressField3: consignee['Address Line 3'],
    city: consignee['City'],
    state: consignee['State'],
    postCode: consignee['Zip'],
    postCountry: consignee['Country'],
    contactName: consignee['Contact'],
    contactEmail: consignee['Email'],
    telephone: consignee['Telephone'],
    tollFree: consignee['Toll Free'],
    recievingHours: consignee['Recieving Hours'],
    appointments: consignee['Appointments'],
    intersections: consignee['Intersections'],
    notes: consignee['Notes'],

    organization: {
      connect: { id: organization.id },
    },
  };

  // add shipper if not exist
  // or update
  if (consignee.shipper) {
    data.shipper = {
      upsert: {
        where: { consigneeId: id }, // foreign key
        create: {
          status: consignee['Status'] as Status,
          name: consignee['Consignee Name'] || '',
          address: consignee['Address'],
          addressField2: consignee['Address Line 2'],
          addressField3: consignee['Address Line 3'],
          city: consignee['City'] || '',
          state: consignee['State'] || '',
          postCode: consignee['Zip'] || '',
          postCountry: consignee['Country'] || '',
          contactName: consignee['Contact'],
          contactEmail: consignee['Email'],
          telephone: consignee['Telephone'],
          tollFree: consignee['Toll Free'],
          shippingHours: consignee['Recieving Hours'],
          appointments: consignee['Appointments'],
          intersections: consignee['Intersections'],
          notes: consignee['Notes'],
          organization: { connect: { id: organization.id } },
        },
        update: {
          status: consignee['Status'] as Status,
          name: consignee['Consignee Name'] || '',
          address: consignee['Address'],
          addressField2: consignee['Address Line 2'],
          addressField3: consignee['Address Line 3'],
          city: consignee['City'] || '',
          state: consignee['State'] || '',
          postCode: consignee['Zip'] || '',
          postCountry: consignee['Country'] || '',
          contactName: consignee['Contact'],
          contactEmail: consignee['Email'],
          telephone: consignee['Telephone'],
          tollFree: consignee['Toll Free'],
          shippingHours: consignee['Recieving Hours'],
          appointments: consignee['Appointments'],
          intersections: consignee['Intersections'],
          notes: consignee['Notes'],
          organization: { connect: { id: organization.id } },
        },
      },
    };
  }

  const resp = await prisma.consignee.update({
    where: { id: id },
    data,
  });

  return resp;
}
