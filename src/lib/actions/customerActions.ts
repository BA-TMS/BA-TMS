'use server';

import prisma from '@util/prisma/client';
import { getOrganization } from '@/lib/dbActions';
import { CustomerFormData } from '@/types/customerTypes';

const CUSTOMER_RELATIONS = {
  factor: { select: { name: true } },
  organization: { select: { orgName: true } },
};

export async function getCustomer(id: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
  return customer;
}

export async function getCustomers(organization: string) {
  const customers = await prisma.customer.findMany({
    where: {
      organization: {
        orgName: organization,
      },
    },
    orderBy: [
      {
        companyName: 'asc',
      },
    ],
    include: CUSTOMER_RELATIONS,
  });
  return customers;
}

export async function addCustomer({
  customer,
}: {
  customer: CustomerFormData;
}) {
  // find organization based on name
  const organization = await getOrganization(customer.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add customer :(';
  }

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

      orgId: organization.id,
    },
    include: CUSTOMER_RELATIONS,
  });
  return resp;
}

export async function updateCustomer(
  id: string,
  { customer }: { customer: Partial<CustomerFormData> }
) {
  // find organization based on name
  const organization = await getOrganization(customer.orgName);

  // TODO: Better error handling
  if (organization === null) {
    throw 'can not add customer :(';
  }

  const resp = await prisma.customer.update({
    where: { id },
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

      orgId: organization.id,
    },
    include: CUSTOMER_RELATIONS,
  });

  return resp;
}
