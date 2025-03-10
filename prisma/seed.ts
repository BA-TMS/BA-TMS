const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orgIds = [];
  const carrierIds = [];
  const customerIds = [];
  // I tried to use the indexes from the arrays of objects, but this seems weird and fragile in TS. Something to return to?
  let loadPos = 0;
  const userPos = 0;
  let driverPos = 0;

  for (const currOrg of orgs) {
    const resp = await prisma.organization.upsert({
      where: { orgName: currOrg.orgName },
      update: currOrg,
      create: currOrg,
    });
    orgIds.push(resp.id);
  }

  for (const currUser of users) {
    const organization = await prisma.organization.findFirst({
      where: { orgName: currUser.organization },
    });

    await prisma.user.upsert({
      where: { id: currUser.id },
      update: {
        email: currUser.email,
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        orgId: organization.id,
      },
      create: {
        id: currUser.id,
        email: currUser.email,
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        orgId: organization.id,
      },
    });

    const permissions = currUser.Permissions;

    if (permissions) {
      await prisma.permissions.upsert({
        where: { userId: currUser.id },
        update: {},
        create: {
          status: permissions.status,
          role: permissions.role,
          user: {
            connect: { id: currUser.id }, // Link to the existing user
          },
        },
      });
    }
  }

  for (const currCarrier of carriers) {
    const carrierResp = await prisma.carrier.upsert({
      where: { id: currCarrier.id },
      create: {
        carrierName: currCarrier.carrierName,
        address: currCarrier.address,
        city: currCarrier.city,
        state: currCarrier.state,
        postCountry: currCarrier.postCountry,
        postCode: currCarrier.postCode,
        contactTelephone: currCarrier.contactTelephone,
        paymentTerms: currCarrier.paymentTerms,
        docketNumType: currCarrier.docketNumType,
        docketNumber: currCarrier.docketNumber,
        dotId: currCarrier.dotId,
        taxId: currCarrier.taxId,
        orgId: currCarrier.orgId,
      },
      update: {
        carrierName: currCarrier.carrierName,
        address: currCarrier.address,
        city: currCarrier.city,
        state: currCarrier.state,
        postCountry: currCarrier.postCountry,
        postCode: currCarrier.postCode,
        contactTelephone: currCarrier.contactTelephone,
        paymentTerms: currCarrier.paymentTerms,
        docketNumType: currCarrier.docketNumType,
        docketNumber: currCarrier.docketNumber,
        dotId: currCarrier.dotId,
        taxId: currCarrier.taxId,
        orgId: currCarrier.orgId,
      },
    });

    const carrierInsurance = currCarrier.CarrierInsurance;
    if (carrierInsurance) {
      await prisma.carrierInsurance.upsert({
        where: { carrierId: carrierResp.id },
        update: {
          fmcsaInsCompany: carrierInsurance.fmcsaInsCompany,
          fmcsaInsPolicy: carrierInsurance.fmcsaInsPolicy,
          fmcsaType: carrierInsurance.fmcsaType,
          fmcsaCoverage: carrierInsurance.fmcsaCoverage,
        },
        create: {
          carrierId: carrierResp.id,
          fmcsaInsCompany: carrierInsurance.fmcsaInsCompany,
          fmcsaInsPolicy: carrierInsurance.fmcsaInsPolicy,
          fmcsaType: carrierInsurance.fmcsaType,
          fmcsaCoverage: carrierInsurance.fmcsaCoverage,
        },
      });
    }

    carrierIds.push(carrierResp.id);
  }

  for (const currDriver of drivers) {
    currDriver.orgId = orgIds[driverPos % orgIds.length];
    const resp = await prisma.driver.upsert({
      where: { id: currDriver.id },
      update: {},
      create: currDriver,
    });
    driverPos += 1;
  }

  for (const currCustomer of customers) {
    const resp = await prisma.customer.upsert({
      where: { companyName: currCustomer.companyName },
      update: {},
      create: currCustomer,
    });
    customerIds.push(resp.id);
  }

  for (const currShipper of shippers) {
    const resp = await prisma.shipper.upsert({
      where: { id: currShipper.id },
      update: {},
      create: currShipper,
    });
  }

  for (const currConsignee of consignees) {
    const resp = await prisma.consignee.upsert({
      where: { id: currConsignee.id },
      update: {},
      create: currConsignee,
    });
  }

  for (const currLoad of loads) {
    currLoad.orgId = orgIds[loadPos % orgIds.length];
    currLoad.carrierId = carrierIds[loadPos % carrierIds.length];
    currLoad.customerId = customerIds[loadPos % customerIds.length];
    const resp = await prisma.load.upsert({
      where: {
        orgId: currLoad.orgId,
        loadNum: currLoad.loadNum,
      },
      update: {},
      create: currLoad,
    });
    loadPos += 1;
  }

  for (const currFactor of factors) {
    const resp = await prisma.factor.upsert({
      where: { id: currFactor.id },
      update: {},
      create: currFactor,
    });
  }

  for (const currInsurer of insurers) {
    const resp = await prisma.insurer.upsert({
      where: { telephone: currInsurer.telephone },
      update: {},
      create: currInsurer,
    });
  }

  for (const currBroker of brokers) {
    const resp = await prisma.broker.upsert({
      where: { id: currBroker.id },
      update: {},
      create: currBroker,
    });
  }

  for (const currBillee of billees) {
    const resp = await prisma.billee.upsert({
      where: { telephone: currBillee.telephone },
      update: {},
      create: currBillee,
    });
  }

  for (const currTruck of trucks) {
    const resp = await prisma.truck.upsert({
      where: { id: currTruck.id },
      update: {},
      create: currTruck,
    });
  }

  for (const currTrailer of trailers) {
    const resp = await prisma.trailer.upsert({
      where: { id: currTrailer.id },
      update: {},
      create: currTrailer,
    });
  }

  await seedAccountPreferences();
}

async function seedAccountPreferences() {
  const prefs = {
    id: '0',
    companyName: 'companyName1',
    primaryContactName: 'primaryContactName1',
    telephone: '1231231234',
    tollFree: '3213214321',
    fei: '234v56',
    currency: 'American Dollars',
    dateFormat: 'm/d/Y',
    timeFormat: '12 Hour',
    calendarFormat: 'Yearly',
    mileageSystem: 'ProMiles',
    printSetting: 'Avoid Toll Roads',
  };

  await prisma.accountPreferences.upsert({
    where: { id: prefs.id },
    update: prefs,
    create: prefs,
  });
}

const orgs = [
  {
    id: '103784cb-e739-446c-ba47-e92d92de648a',
    orgName: 'Swift Delivery',
    address: '73 N. Hightland Court',
    city: 'West Redding',
    state: 'PA',
    postCountry: 'USA',
    postCode: '19611',
    telephone: '1234567890',
    docketNumType: 'FF',
    docketNumber: '138963',
  },
  {
    id: 'e739-446c-ba47-e92d92de648c',
    orgName: 'BA Logistics',
    address: '26 Mill Circle',
    city: 'Long Beach',
    state: 'CA',
    postCountry: 'USA',
    postCode: '90712',
    telephone: '6168675309',
    docketNumType: 'MC',
    docketNumber: '138965',
  },
];

const users = [
  {
    id: '112-334455',
    email: 'hunter@balogistics.com',
    firstName: 'Hunter',
    lastName: 'Higgins',
    organization: 'BA Logistics',
    Permissions: {
      role: 'DISPATCHER',
      status: 'ACTIVE',
    },
  },
  {
    id: '112-334667',
    email: 'patricia@balogistics.com',
    firstName: 'Patricia',
    lastName: 'Mendez',
    organization: 'BA Logistics',
    Permissions: {
      role: 'OWNER',
      status: 'ACTIVE',
    },
  },
];

const carriers = [
  {
    id: 'a0f1826a-ed37-4e8d-988e-d52afd2a953a',
    carrierName: 'Carrier1',
    address: '70 Wall St',
    city: 'New York',
    state: 'New York',
    postCountry: 'USA',
    postCode: '10005',
    contactTelephone: '9987654321',
    paymentTerms: 'Net 30',
    docketNumType: 'FF',
    docketNumber: '12974',
    dotId: '42',
    taxId: '42',
    CarrierInsurance: {
      fmcsaInsCompany: 'FMCSA Company',
      fmcsaInsPolicy: '42',
      fmcsaType: 'BPID',
      fmcsaCoverage: '40000',
    },
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
  },
  {
    id: '3997ed89-8767-4020-b8e1-7011469af2e7',
    carrierName: 'Carrier2',
    address: '79 Mayflower St',
    city: 'Smyrna',
    state: 'Georgia',
    postCountry: 'USA',
    postCode: '30080',
    contactTelephone: '1112223333',
    paymentTerms: 'Net 30',
    docketNumType: 'FF',
    docketNumber: '12454',
    dotId: '7',
    taxId: '7',
    CarrierInsurance: {
      fmcsaInsCompany: 'FMCSA Company',
      fmcsaInsPolicy: '7',
      fmcsaType: 'BPID',
      fmcsaCoverage: '40000',
    },
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
];

const drivers = [
  {
    name: 'Speed',
    license: '111111',
    telephone: '1111111111',
    email: 'speed@speeddrives.com',
    country: 'USA',
    state: 'TX',
    city: 'El Paso',
    orgId: null,
    id: '3786ab8c-ebb1-4580-bc08-1be692fb5f07',
  },
  {
    name: 'Rex',
    license: '222222',
    telephone: '2222222222',
    email: 'rex@drive.com',
    country: 'USA',
    state: 'GA',
    city: 'Atlanta',
    orgId: null,
    id: '1786ab8c-ebb1-4580-bd09-1be692fb5f07',
  },
];

const customers = [
  {
    companyName: 'Customer1',
    contactName: 'John Customer1',
    contactEmail: 'jc1@customer1.com',
    contactTelephone: '1112223333',
    contactCountry: 'USA',
    contactAddress: '26 Grand St',
    contactCity: 'Oxford',
    contactState: 'MS',
    contactPostCode: '38655',
    billingEmail: 'jc1@customer1.com',
    billingTelephone: '1112223333',
    billingCountry: 'USA',
    billingAddress: '26 Grand St',
    billingCity: 'Oxford',
    billingState: 'MS',
    billingPostCode: '38655',
    paymentTerms: 'Prompt',
    federalID: '55-9386763',
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
  },
  {
    companyName: 'Customer2',
    contactName: 'John Customer2',
    contactEmail: 'jc2@customer2.com',
    contactTelephone: '7778889999',
    contactCountry: 'USA',
    contactAddress: '54 Woodland St',
    contactCity: 'Nashua',
    contactState: 'NH',
    contactPostCode: '03060',
    billingEmail: 'jc2@customer2.com',
    billingTelephone: '7778889999',
    billingCountry: 'USA',
    billingAddress: '54 Woodland St',
    billingCity: 'Nashua',
    billingState: 'NH',
    billingPostCode: '03060',
    paymentTerms: 'Prompt',
    federalID: '21-4094358',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
];

const shippers = [
  {
    id: 'bd09-1be692fb5f07',
    name: 'Reylo',
    address: '73 Newbridge St',
    city: 'West Des Moines',
    state: 'IA',
    postCountry: 'USA',
    postCode: '50265',
    telephone: '9998887777',
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
  },
  {
    id: 'fg10-1be692fb5f07',
    name: 'Johnlock',
    address: '2 Lookout Dr',
    city: 'Perrysburg',
    state: 'OH',
    postCountry: 'USA',
    postCode: '43551',
    telephone: '6665554444',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
];

const consignees = [
  {
    id: 'fg10-1be692fb5f18',
    name: 'Consignee1',
    address: '7524 Pine Road',
    city: 'Daphne',
    state: 'AL',
    postCountry: 'USA',
    postCode: '36526',
    telephone: '2923834774',
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
  },
  {
    id: 'ggg10-1be692fb5f07',
    name: 'Consignee2',
    address: '7352 Rosewood Street',
    city: 'Deerfield',
    state: 'IL',
    postCountry: 'USA',
    postCode: '60015',
    telephone: '9298387447',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
];

const factors = [
  {
    id: 'te74hf',
    name: 'Factor1',
    address: '11111 Main St',
    city: 'Allentown',
    state: 'PA',
    postCountry: 'USA',
    postCode: '11111',
    telephone: '4567891234',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
  {
    id: '1fhr74',
    name: 'Factor2',
    address: '8900000 Rt 16',
    city: 'Springfield',
    state: 'MA',
    postCountry: 'USA',
    postCode: '44444',
    telephone: '7778889999',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
];

const insurers = [
  {
    name: 'Insurance Guy',
    address: '129 Union St',
    city: 'Townsville',
    state: 'VA',
    postCountry: 'USA',
    postCode: '11221',
    telephone: '5469094411',
  },
  {
    name: 'Snoopy Logo Corp',
    address: '33 Park Ave',
    city: 'Hartford',
    state: 'CN',
    postCountry: 'USA',
    postCode: '22331',
    telephone: '8609993333',
  },
];

const brokers = [
  {
    id: '12AV43',
    status: 'ACTIVE',
    name: 'Broker1',
    crossing: 'Millers',
    telephone: '9988776655',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
  {
    id: '14VHG73',
    status: 'ACTIVE',
    name: 'Broker2',
    crossing: 'Crossup',
    telephone: '1012023003',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
];

const billees = [
  {
    name: 'Billee Jean',
    address: '1423 Location Ave',
    city: 'Modesto',
    state: 'CA',
    postCountry: 'USA',
    postCode: '88111',
    telephone: '4589023490',
  },
  {
    name: 'Billee D Williams',
    address: '123 Fake Street',
    city: 'Ocean City',
    state: 'NJ',
    postCountry: 'USA',
    postCode: '11221',
    telephone: '0987651234',
  },
];

const loads = [
  {
    orgId: 'e739-446c-ba47-e92d92de648c',
    loadNum: '69',
    payOrderNum: '1111',
    carrierId: null,
    customerId: null,
  },
  {
    orgId: 'e739-446c-ba47-e92d92de648c',
    loadNum: '420',
    payOrderNum: '0088',
    carrierId: null,
    customerId: null,
  },
  {
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
    loadNum: '1111',
    payOrderNum: '3232',
    carrierId: null,
    customerId: null,
  },
  {
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
    loadNum: '2222',
    payOrderNum: '1212',
    carrierId: null,
    customerId: null,
  },
];

const trucks = [
  {
    id: 'fgh739',
    truckNum: 'AA000',
    licensePlate: '88BB000',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Big',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
  {
    id: 'fgh73940',
    truckNum: 'A1B2C3D4',
    licensePlate: '89RM99',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Also Big',
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
  },
];

const trailers = [
  {
    id: '123-12389',
    licensePlate: 'EE66RR9900',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Container',
    orgId: '103784cb-e739-446c-ba47-e92d92de648a',
  },
  {
    id: '127-12004',
    licensePlate: '00MM11WW7896',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Flatbed',
    orgId: 'e739-446c-ba47-e92d92de648c',
  },
];

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
