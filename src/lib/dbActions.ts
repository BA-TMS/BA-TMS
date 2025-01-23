/* eslint-disable indent */
'use server';

import { DocketNumber, PrismaClient, DriverType } from '@prisma/client';
import { CustomerFormData } from '@/types/customerTypes';
import { LoadFormData } from '@/types/loadTypes';
import { CarrierFormData } from '@/types/carrierTypes';
import { BrokerFormData } from '@/types/brokerTypes';
import { ConsigneeFormData } from '@/types/consigneeTypes';
import { DriverFormData } from '@/types/driverTypes';
import { FactorFormData } from '@/types/factorTypes';
import { ShipperFormData } from '@/types/shipperTypes';
import { BilleeFormData } from '@/types/billeeTypes';
import { TrailerFormData } from '@/types/trailerTypes';
import { TruckFormData } from '@/types/truckTypes';
import { AccountPreferences } from '@/types/accountTypes';

// This file contains different server actions for interracting with the database via Prisma client

const prisma = new PrismaClient();

const LOAD_RELATIONS = {
  carrier: { select: { carrierName: true } },
  driver: { select: { name: true } },
  customer: { select: { companyName: true } },
  shipper: { select: { name: true } },
  consignee: { select: { name: true } },
};

const CARRIER_RELATIONS = {
  factor: { select: { name: true } },
  CarrierInsurance: true,
};

const CUSTOMER_RELATIONS = {
  factor: { select: { name: true } },
};

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

export async function getBrokers() {
  const brokers = await prisma.broker.findMany();
  return brokers;
}

export async function getCarrier(id: string) {
  const carrier = await prisma.carrier.findUnique({
    where: {
      id: id,
    },
    include: { CarrierInsurance: true },
  });
  return carrier;
}

export async function getCarriers() {
  const relations = CARRIER_RELATIONS;
  const carriers = await getter(prisma.carrier, relations);
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

export async function getConsignees() {
  const consignees = await getter(prisma.consignee, null);
  return consignees;
}

export async function getCustomer(id: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
  return customer;
}

export async function getCustomers() {
  const relations = {
    factor: { select: { name: true } },
  };
  const customers = await getter(prisma.customer, relations);
  return customers;
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

export async function getFactor(id: string) {
  const factor = await prisma.factor.findUnique({
    where: {
      id: id,
    },
  });

  return factor;
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

export async function addBroker({ broker }: { broker: BrokerFormData }) {
  const resp = await prisma.broker.create({
    data: {
      status: broker['Status'],
      name: broker['Broker Name'],
      crossing: broker['Crossing'],
      telephone: broker['Telephone'],
      tollFree: broker['Toll Free'] ? broker['Toll Free'] : null,
    },
  });
  return resp;
}

export async function addCarrier({ carrier }: { carrier: CarrierFormData }) {
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

export async function addConsignee({
  consignee,
}: {
  consignee: ConsigneeFormData;
}) {
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
  return resp;
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

export async function addFactoringCo({ factor }: { factor: FactorFormData }) {
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
  return resp;
}

export async function addLoad({ load }: { load: LoadFormData }) {
  // do not change to dispatched without a carrier
  if (load['Status'] === 'DISPATCHED' && !load['Carrier']) {
    throw new Error(
      'Cannot create a load with status of "Dispatched" without a carrier.'
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

export async function addShipper({ shipper }: { shipper: ShipperFormData }) {
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
  return resp;
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
async function updater(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any, // same issue as in the getter, not sure how to type this
  targetId: number,
  upateData: unknown
) {
  const resp = table.update({
    where: {
      id: targetId,
    },
    data: upateData,
  });
  return resp;
}

export async function updateBroker(
  id: string,
  { broker }: { broker: BrokerFormData }
) {
  const resp = await prisma.broker.update({
    where: { id: id },
    data: {
      status: broker['Status'],
      name: broker['Broker Name'],
      crossing: broker['Crossing'],
      telephone: broker['Telephone'],
      tollFree: broker['Toll Free'] ? broker['Toll Free'] : null,
    },
  });
  return resp;
}

export async function updateCarrier(
  id: string,
  { carrier }: { carrier: CarrierFormData }
) {
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

export async function updateConsignee(
  id: number,
  { formData }: { formData: ConsigneeFormData }
) {
  const resp = updater(prisma.consignee, id, formData);
  return resp;
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

export async function updateLoad(
  id: string,
  { formData }: { formData: Partial<LoadFormData> }
) {
  // do not change to dispatched without a carrier
  if (formData['Status'] === 'DISPATCHED' && !formData['Carrier']) {
    throw new Error(
      'Cannot update a load status to "Dispatched" without a carrier.'
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
      carrierId: load['Carrier'] ? load['Carrier'] : null,
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
  { formData }: { formData: Partial<ShipperFormData> }
) {
  const resp = updater(prisma.shipper, id, formData);
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

/** Delete rows */

export async function deleteLoad(id: string) {
  return prisma.load.delete({
    where: {
      id: id,
    },
  });
}
