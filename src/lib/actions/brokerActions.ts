'use server';

import { PrismaClient } from '@prisma/client';
import { BrokerFormData } from '@/types/brokerTypes';

// This file contains server actions for interracting with the Customs Broker table in the database

const prisma = new PrismaClient();

const BROKER_RELATIONS = {
  organization: { select: { orgName: true } },
};

export async function getBrokers(organization: string) {
  const brokers = await prisma.broker.findMany({
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
    include: BROKER_RELATIONS,
  });
  return brokers;
}

export async function addBroker({ broker }: { broker: BrokerFormData }) {
  // find organization based on name
  const organization = await prisma.organization.findFirst({
    where: {
      orgName: broker.orgName,
    },
    select: {
      id: true,
    },
  });

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not create broker';
  }
  const resp = await prisma.broker.create({
    data: {
      status: broker['Status'],
      name: broker['Broker Name'],
      crossing: broker['Crossing'],
      telephone: broker['Telephone'],
      tollFree: broker['Toll Free'] ? broker['Toll Free'] : null,
      orgId: organization.id,
    },
  });
  return resp;
}

export async function updateBroker(
  id: string,
  { broker }: { broker: BrokerFormData }
) {
  // find organization based on name
  const organization = await prisma.organization.findFirst({
    where: {
      orgName: broker.orgName,
    },
    select: {
      id: true,
    },
  });

  // TODO: Better error handling
  if (organization === null) {
    throw 'Can not update broker';
  }
  const resp = await prisma.broker.update({
    where: { id: id },
    data: {
      status: broker['Status'],
      name: broker['Broker Name'],
      crossing: broker['Crossing'],
      telephone: broker['Telephone'],
      tollFree: broker['Toll Free'] ? broker['Toll Free'] : null,
      orgId: organization.id,
    },
  });
  return resp;
}
