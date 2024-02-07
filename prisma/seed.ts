const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const orgIds = [];
  const carrierIds = [];
  const customerIds = [];
  let loadPos = 0;

  for (const currOrg of orgs) {
    const resp = await prisma.organization.upsert({
      where: { name: currOrg.name },
      update: {},
      create: currOrg,
    });
    orgIds.push(resp.id);
  }

  for (const currCarrier of carriers) {
    const resp = await prisma.carrier.upsert({
      where: { name: currCarrier.name },
      update: {},
      create: currCarrier,
    });
    carrierIds.push(resp.id);
  }

  for (const currCustomer of customers) {
    const resp = await prisma.customer.upsert({
      where: { name: currCustomer.name },
      update: {},
      create: currCustomer,
    });
    customerIds.push(resp.id);
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
}

const orgs = [
  {
    name: "Org1",
    address: "73 N. Hightland Court",
    city: "Lititz",
    state: "PA",
    postCountry: "USA",
    postCode: "17543",
    telCountry: 1,
    telephone: "1234567890",
  },
  {
    name: "Org2",
    address: "26 Mill Circle",
    city: "Greenwood",
    state: "SC",
    postCountry: "USA",
    postCode: "17543",
    telCountry: 1,
    telephone: "6168675309",
  },
];

const users = [
  {
    email: "testuser1@org1.com",
    password: "test1234",
    orgId: null,
    role: 1,
  },
  {
    email: "testuser2@org2.com",
    password: "test1234",
    orgId: null,
    role: 1,
  },
];

const carriers = [
  {
    name: "Carrier1",
    address: "70 Wall St",
    city: "Wethersfield",
    state: "CT",
    postCountry: "USA",
    postCode: "06109",
    telCountry: 1,
    telephone: "9987654321",
    dotId: 42,
  },
  {
    name: "Carrier2",
    address: "79 Mayflower St",
    city: "Smyrna",
    state: "GA",
    postCountry: "USA",
    postCode: "30080",
    telCountry: 1,
    telephone: "1112223333",
    dotId: 7,
  },
];

const customers = [
  {
    name: "Customer1",
    address: "26 Grand St",
    city: "Oxford",
    state: "MS",
    postCountry: "USA",
    postCode: "38655",
    telCountry: 1,
    telephone: "4445556666",
  },
  {
    name: "Customer2",
    address: "54 Woodland St",
    city: "Nashua",
    state: "NH",
    postCountry: "USA",
    postCode: "03060",
    telCountry: 1,
    telephone: "7778889999",
  },
];

const shippers = [
  {
    name: "Reylo",
    address: "73 Newbridge St",
    city: "West Des Moines",
    state: "IA",
    postCountry: "USA",
    postCode: "50265",
    telCountry: 1,
    telephone: "9998887777",
  },
  {
    name: "Johnlock",
    address: "2 Lookout Dr",
    city: "Perrysburg",
    state: "OH",
    postCountry: "USA",
    postCode: "43551",
    telCountry: 1,
    telephone: "6665554444",
  },
];

const consignees = [
  {
    name: "Consignee1",
    address: "7524 Pine Road",
    city: "Daphne",
    state: "AL",
    postCountry: "USA",
    postCode: "36526",
    telCountry: 1,
    telephone: "2923834774",
  },
  {
    name: "Consignee2",
    address: "7352 Rosewood Street",
    city: "Deerfield",
    state: "IL",
    postCountry: "USA",
    postCode: "60015",
    telCountry: 1,
    telephone: "9298387447",
  },
];

const loads = [
  {
    ownerId: null,
    loadNum: 69,
    carrierId: null,
    customerId: null,
  },
  {
    ownerId: null,
    loadNum: 420,
    carrierId: null,
    customerId: null,
  },
  {
    ownerId: null,
    loadNum: 1111,
    carrierId: null,
    customerId: null,
  },
  {
    ownerId: null,
    loadNum: 2222,
    carrierId: null,
    customerId: null,
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
