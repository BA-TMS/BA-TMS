'use server';

import prisma from '@util/prisma/client';
import { Status } from '@prisma/client';
import { FactorFormData } from '@/types/factorTypes';
import { getOrganization } from '@/lib/dbActions';

// this file contains actions for interacting with the database Factor table

const FACTOR_RELATIONS = {
  organization: { select: { orgName: true } },
};

export async function getFactor(id: string) {
  const factor = await prisma.factor.findUnique({
    where: {
      id: id,
    },
  });

  return factor;
}

export async function getFactors(organization: string) {
  const factors = await prisma.factor.findMany({
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
    include: FACTOR_RELATIONS,
  });
  return factors;
}

export async function addFactoringCo({ factor }: { factor: FactorFormData }) {
  // find organization based on name
  const organization = await getOrganization(factor.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not create factoring company';
  }

  const resp = await prisma.factor.create({
    data: {
      orgId: organization.id,
      status: factor['Status'] as Status,
      name: factor['Factor Name'],
      address: factor['Address'],
      addressAddOn: factor['Address Line 2'],
      city: factor['City'],
      state: factor['State'],
      postCode: factor['Zip'],
      postCountry: factor['Country'],

      primaryContact: factor['Primary Contact'],
      telephone: factor['Telephone'],
      tollFree: factor['Toll Free'],
      email: factor['Email'],
      secondaryContact: factor['Secondary Contact'],
      secondaryTelephone: factor['Secondary Telephone'],

      currency: factor['Currency'],
      paymentTerms: factor['Payment Terms'],
      taxId: factor['Tax ID#'],

      notes: factor['Notes'],
    },
    include: FACTOR_RELATIONS,
  });
  return resp;
}

export async function updateFactor(
  id: string,
  { factor }: { factor: FactorFormData }
) {
  // find organization based on name
  const organization = await getOrganization(factor.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not update factoring company';
  }

  // TODO: Better error handling
  if (organization === null) {
    throw 'Can not update broker';
  }

  const resp = await prisma.factor.update({
    where: { id: id },
    data: {
      status: factor['Status'] as Status,
      name: factor['Factor Name'],
      address: factor['Address'],
      addressAddOn: factor['Address Line 2'],
      city: factor['City'],
      state: factor['State'],
      postCode: factor['Zip'],
      postCountry: factor['Country'],

      primaryContact: factor['Primary Contact'],
      telephone: factor['Telephone'],
      tollFree: factor['Toll Free'],
      email: factor['Email'],
      secondaryContact: factor['Secondary Contact'],
      secondaryTelephone: factor['Secondary Telephone'],

      currency: factor['Currency'],
      paymentTerms: factor['Payment Terms'],
      taxId: factor['Tax ID#'],

      notes: factor['Notes'],
    },
    include: FACTOR_RELATIONS,
  });
  return resp;
}
