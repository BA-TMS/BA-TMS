const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orgIds = [];
  const carrierIds = [];
  const customerIds = [];
  // I tried to use the indexes from the arrays of objects, but this seems weird and fragile in TS. Something to return to?
  let loadPos = 0;
  let userPos = 0;
  let driverPos = 0;

  for (const currOrg of orgs) {
    const resp = await prisma.organization.upsert({
      where: { name: currOrg.name },
      update: {},
      create: currOrg,
    });
    orgIds.push(resp.id);
  }

  for (const currUser of users) {
    currUser.orgId = orgIds[userPos % orgIds.length];
    const resp = await prisma.user.upsert({
      where: { email: currUser.email },
      update: {},
      create: currUser,
    });
    userPos += 1;
  }

  for (const currCarrier of carriers) {
    const resp = await prisma.carrier.upsert({
      where: { dotId: currCarrier.dotId },
      update: {},
      create: currCarrier,
    });
    carrierIds.push(resp.id);
  }

  for (const currDriver of drivers) {
    currDriver.employerId = carrierIds[driverPos % carrierIds.length];
    const resp = await prisma.driver.upsert({
      where: { license: currDriver.license },
      update: {},
      create: currDriver,
    });
    driverPos += 1;
  }

  for (const currCustomer of customers) {
    const resp = await prisma.customer.upsert({
      where: { name: currCustomer.name },
      update: {},
      create: currCustomer,
    });
    customerIds.push(resp.id);
  }

  for (const currShipper of shippers) {
    const resp = await prisma.shipper.upsert({
      where: { telephone: currShipper.telephone },
      update: {},
      create: currShipper,
    });
  }

  for (const currConsignee of consignees) {
    const resp = await prisma.consignee.upsert({
      where: { telephone: currConsignee.telephone },
      update: {},
      create: currConsignee,
    })
  }

  for (const currLoad of loads) {
    currLoad.ownerId = orgIds[loadPos % orgIds.length];
    currLoad.carrierId = carrierIds[loadPos % carrierIds.length];
    currLoad.customerId = customerIds[loadPos % customerIds.length];
    const resp = await prisma.load.upsert({
      where: {
        ownerId_loadNum: {
          ownerId: currLoad.ownerId,
          loadNum: currLoad.loadNum,
        },
      },
      update: {},
      create: currLoad,
    });
    loadPos += 1;
  }

  for (const currFactor of factors) {
    const resp = await prisma.factor.upsert({
      where: {telephone: currFactor.telephone},
      update: {},
      create: currFactor
    })
  }

  for (const currInsurer of insurers) {
    const resp = await prisma.insurer.upsert({
      where: { telephone: currInsurer.telephone },
      update: {},
      create: currInsurer
    });
  }

  for (const currBroker of brokers) {
    const resp = await prisma.broker.upsert({
      where: { telephone: currBroker.telephone },
      update: {},
      create: currBroker
    });
  }

  for (const currBillee of billees) {
    const resp = await prisma.billee.upsert({
      where: {telephone: currBillee.telephone},
      update: {},
      create: currBillee
    })
  }

  for (const currTruck of trucks) {
    const resp = await prisma.truck.upsert({
      where: { licensePlate: currTruck.licensePlate },
      update: {},
      create: currTruck
    });
  }

  for (const currTrailer of trailers) {
    const resp = await prisma.trailer.upsert({
      where: {licensePlate: currTrailer.licensePlate},
      update: {},
      create: currTrailer
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
    update: {},
    create: prefs,
  });
}

const orgs = [
  {
    name: 'Org1',
    address: '73 N. Hightland Court',
    city: 'Lititz',
    state: 'PA',
    postCountry: 'USA',
    postCode: '17543',
    telephone: '1234567890',
  },
  {
    name: 'Org2',
    address: '26 Mill Circle',
    city: 'Greenwood',
    state: 'SC',
    postCountry: 'USA',
    postCode: '17543',
    telephone: '6168675309',
  },
];

const users = [
  {
    email: 'testuser1@org1.com',
    password: 'test1234',
    orgId: null,
  },
  {
    email: 'testuser2@org2.com',
    password: 'test1234',
    orgId: null,
  },
];

const carriers = [
  {
    name: 'Carrier1',
    address: '70 Wall St',
    city: 'Wethersfield',
    state: 'CT',
    postCountry: 'USA',
    postCode: '06109',
    telephone: '9987654321',
    dotId: '42',
    taxId: '42',
  },
  {
    name: 'Carrier2',
    address: '79 Mayflower St',
    city: 'Smyrna',
    state: 'GA',
    postCountry: 'USA',
    postCode: '30080',
    telephone: '1112223333',
    dotId: '7',
    taxId: '7',
  },
];

const drivers = [
  {
    name: 'Speed',
    license: '111111',
    telephone: '1111111111',
    employerId: null,
  },
  {
    name: 'Rex',
    license: '222222',
    telephone: '2222222222',
    employerId: null,
  },
];

const customers = [
  {
    name: 'Customer1',
    address: '26 Grand St',
    city: 'Oxford',
    state: 'MS',
    postCountry: 'USA',
    postCode: '38655',
    telephone: '4445556666',
  },
  {
    name: 'Customer2',
    address: '54 Woodland St',
    city: 'Nashua',
    state: 'NH',
    postCountry: 'USA',
    postCode: '03060',
    telephone: '7778889999',
  },
];

const shippers = [
  {
    name: 'Reylo',
    address: '73 Newbridge St',
    city: 'West Des Moines',
    state: 'IA',
    postCountry: 'USA',
    postCode: '50265',
    telephone: '9998887777',
  },
  {
    name: 'Johnlock',
    address: '2 Lookout Dr',
    city: 'Perrysburg',
    state: 'OH',
    postCountry: 'USA',
    postCode: '43551',
    telephone: '6665554444',
  },
];

const consignees = [
  {
    name: 'Consignee1',
    address: '7524 Pine Road',
    city: 'Daphne',
    state: 'AL',
    postCountry: 'USA',
    postCode: '36526',
    telephone: '2923834774',
  },
  {
    name: 'Consignee2',
    address: '7352 Rosewood Street',
    city: 'Deerfield',
    state: 'IL',
    postCountry: 'USA',
    postCode: '60015',
    telephone: '9298387447',
  },
];

const factors = [
  {
    name: 'Factor1',
    address: '11111 Main St',
    city: 'Allentown',
    state: 'PA',
    postCountry: 'USA',
    postCode: '11111',
    telephone: '4567891234'
  },
  {
    name: 'Factor2',
    address: '8900000 Rt 16',
    city: 'Springfield',
    state: 'MA',
    postCountry: 'USA',
    postCode: '44444',
    telephone: '7778889999'
  }
]

const insurers = [
  {
    name: 'Insurance Guy',
    address: '129 Union St',
    city: 'Townsville',
    state: 'VA',
    postCountry: 'USA',
    postCode: '11221',
    telephone: '5469094411'
  },
  {
    name: 'Snoopy Logo Corp',
    address: '33 Park Ave',
    city: 'Hartford',
    state: 'CN',
    postCountry: 'USA',
    postCode: '22331',
    telephone: '8609993333'
  }
]

const brokers = [
  {
    name: 'Broker1',
    crossing: 'Millers',
    address: '343 Street Blvd',
    city: 'Topeka',
    state: 'KA',
    postCountry: 'USA',
    postCode: '54321',
    telephone: '9988776655'
  },
  {
    name: 'Broker2',
    crossing: 'Crossup',
    address: '66 Orchard Ln',
    city: 'Orange',
    state: 'NJ',
    postCountry: 'USA',
    postCode: '23456',
    telephone: '1012023003'
  }
]

const billees = [
  {
    name: 'Billee Jean',
    address: '1423 Location Ave',
    city: 'Modesto',
    state: 'CA',
    postCountry: 'USA',
    postCode: '88111',
    telephone: '4589023490'
  },
  {
    name: 'Billee D Williams',
    address: '123 Fake Street',
    city: 'Ocean City',
    state: 'NJ',
    postCountry: 'USA',
    postCode: '11221',
    telephone: '0987651234'
  }
]

const loads = [
  {
    ownerId: null,
    loadNum: '69',
    payOrderNum: '1111',
    carrierId: null,
    customerId: null,
  },
  {
    ownerId: null,
    loadNum: '420',
    payOrderNum: '0088',
    carrierId: null,
    customerId: null,
  },
  {
    ownerId: null,
    loadNum: '1111',
    payOrderNum: '3232',
    carrierId: null,
    customerId: null,
  },
  {
    ownerId: null,
    loadNum: '2222',
    payOrderNum: '1212',
    carrierId: null,
    customerId: null,
  },
];

const trucks = [
  {
    truckNum: 'AA000',
    licensePlate: '88BB000',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Big',
  },
  {
    truckNum: 'A1B2C3D4',
    licensePlate: '89RM99',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Also Big',    
  }
]

const trailers = [
  {
    licensePlate: 'EE66RR9900',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Container'
  },
  {
    licensePlate: '00MM11WW7896',
    plateExpiry: new Date(2027, 9, 4),
    inspectionExpiry: new Date(2027, 9, 4),
    type: 'Flatbed'
  }
]

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
