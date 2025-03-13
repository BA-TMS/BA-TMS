'use server';

import prisma from '@util/prisma/client';
import { CarrierFormData } from '@/types/carrierTypes';
import { DocketNumber } from '@prisma/client';
import { getOrganization } from '../dbActions';

const CARRIER_RELATIONS = {
  organization: { select: { orgName: true } },
  factor: { select: { name: true } },
  CarrierInsurance: true,
};

export async function getCarrier(id: string) {
  const carrier = await prisma.carrier.findUnique({
    where: {
      id: id,
    },
    include: { CarrierInsurance: true },
  });
  return carrier;
}

export async function getCarriers(organization: string) {
  const carriers = await prisma.carrier.findMany({
    where: {
      organization: {
        orgName: organization,
      },
    },
    orderBy: [
      {
        carrierName: 'asc',
      },
    ],
    include: CARRIER_RELATIONS,
  });
  return carriers;
}

export async function getCarrierInsurance(id: string) {
  const insurance = await prisma.carrierInsurance.findUnique({
    where: {
      carrierId: id,
    },
  });
  return insurance;
}

export async function addCarrier({ carrier }: { carrier: CarrierFormData }) {
  // find organization based on name
  const organization = await getOrganization(carrier.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add carrier :(';
  }

  const resp = await prisma.carrier.create({
    data: {
      status: carrier['Status'],

      carrierName: carrier['Carrier Name'],
      address: carrier['Address'],
      addressField2: carrier['Address Line 2'],
      addressField3: carrier['Address Line 3'],
      city: carrier['City'],
      state: carrier['State'],
      postCountry: carrier['Country'],
      postCode: carrier['Zip'],

      contactName: carrier['Contact Name'],
      contactEmail: carrier['Contact Email'],
      contactTelephone: carrier['Telephone'],
      contactTollFree: carrier['Toll Free'],
      contactFax: carrier['Fax'],

      paymentTerms: carrier['Payment Terms'],
      taxId: carrier['Tax ID#'] !== '' ? carrier['Tax ID#'] : null,
      docketNumType: carrier['Docket Number Type'] as DocketNumber,
      docketNumber: carrier['Docket Number'],
      ursNumber: carrier['URS #'] !== '' ? carrier['URS #'] : null,
      dotId: carrier['DOT ID#'],

      factorId:
        carrier['Factoring Company'] !== ''
          ? carrier['Factoring Company']
          : null,
      notes: carrier['Notes'],

      orgId: organization.id,

      CarrierInsurance: {
        create: {
          liabilityCompany: carrier['Liability Insurance Company'],
          liabilityPolicy: carrier['Liability Policy #'],
          liabilityExpiration: carrier['Liability Expiration Date'],
          liabilityTelephone: carrier['Liability Telephone'],
          liabilityContact: carrier['Liability Contact'],

          autoInsCompany: carrier['Auto Insurance Company'],
          autoInsPolicy: carrier['Auto Policy #'],
          autoInsExpiration: carrier['Auto Expiration Date'],
          autoInsTelephone: carrier['Auto Telephone'],
          autoInsContact: carrier['Auto Contact'],

          cargoCompany: carrier['Cargo Company'],
          cargoPolicy: carrier['Cargo Policy #'],
          cargoExpiration: carrier['Cargo Expiration Date'],
          cargoTelephone: carrier['Cargo Telephone'],
          cargoContact: carrier['Cargo Contact'],
          cargoWSIB: carrier['Cargo WSIB #'],

          fmcsaInsCompany: carrier['FMCSA Insurance Company'],
          fmcsaInsPolicy: carrier['FMCSA Policy #'],
          fmcsaInsExpiration: carrier['FMCSA Expiration Date'],
          fmcsaType: carrier['FMCSA Type'],
          fmcsaCoverage: carrier['FMCSA Coverage $'],
          fmcsaTelephone: carrier['FMCSA Telephone'],
        },
      },
    },
    include: CARRIER_RELATIONS,
  });
  return resp;
}

export async function updateCarrier(
  id: string,
  { carrier }: { carrier: CarrierFormData }
) {
  // find organization based on name
  const organization = await getOrganization(carrier.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not update carrier :(';
  }
  const resp = await prisma.carrier.update({
    where: { id: id },
    data: {
      status: carrier['Status'],

      carrierName: carrier['Carrier Name'],
      address: carrier['Address'],
      addressField2: carrier['Address Line 2'],
      addressField3: carrier['Address Line 3'],
      city: carrier['City'],
      state: carrier['State'],
      postCountry: carrier['Country'],
      postCode: carrier['Zip'],

      contactName: carrier['Contact Name'],
      contactEmail: carrier['Contact Email'],
      contactTelephone: carrier['Telephone'],
      contactTollFree: carrier['Toll Free'],
      contactFax: carrier['Fax'],

      paymentTerms: carrier['Payment Terms'],
      taxId: carrier['Tax ID#'] !== '' ? carrier['Tax ID#'] : null,
      docketNumType: carrier['Docket Number Type'] as DocketNumber,
      docketNumber: carrier['Docket Number'],
      ursNumber: carrier['URS #'] !== '' ? carrier['URS #'] : null,
      dotId: carrier['DOT ID#'],

      factorId:
        carrier['Factoring Company'] !== ''
          ? carrier['Factoring Company']
          : null,
      notes: carrier['Notes'],

      orgId: organization.id,

      CarrierInsurance: {
        update: {
          liabilityCompany: carrier['Liability Insurance Company'],
          liabilityPolicy: carrier['Liability Policy #'],
          liabilityExpiration: carrier['Liability Expiration Date'],
          liabilityTelephone: carrier['Liability Telephone'],
          liabilityContact: carrier['Liability Contact'],

          autoInsCompany: carrier['Auto Insurance Company'],
          autoInsPolicy: carrier['Auto Policy #'],
          autoInsExpiration: carrier['Auto Expiration Date'],
          autoInsTelephone: carrier['Auto Telephone'],
          autoInsContact: carrier['Auto Contact'],

          cargoCompany: carrier['Cargo Company'],
          cargoPolicy: carrier['Cargo Policy #'],
          cargoExpiration: carrier['Cargo Expiration Date'],
          cargoTelephone: carrier['Cargo Telephone'],
          cargoContact: carrier['Cargo Contact'],
          cargoWSIB: carrier['Cargo WSIB #'],

          fmcsaInsCompany: carrier['FMCSA Insurance Company'],
          fmcsaInsPolicy: carrier['FMCSA Policy #'],
          fmcsaInsExpiration: carrier['FMCSA Expiration Date'],
          fmcsaType: carrier['FMCSA Type'],
          fmcsaCoverage: carrier['FMCSA Coverage $'],
          fmcsaTelephone: carrier['FMCSA Telephone'],
        },
      },
    },
    include: CARRIER_RELATIONS,
  });
  return resp;
}
