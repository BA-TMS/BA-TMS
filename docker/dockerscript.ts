const { execSync } = require("child_process");

require("dotenv").config();

const CONTAINER_NAME = "a2ztmspostgres";

function containerQuery() {
  const containerBuffer = execSync("docker ps -a");
  return containerBuffer.includes(CONTAINER_NAME);
}

function createRunString() {
  const envProps = [
    `-e POSTGRES_USER=${process.env.DB_USER}`,
    `-e POSTGRES_PASSWORD=${process.env.DB_PASSWORD}`,
    `-e POSTGRES_DB=${process.env.DB_NAME}`,
  ];

  const envString = envProps.join(" ");

  return `docker run --name ${CONTAINER_NAME} ${envString} -p 5432:5432 -d postgres`;
}

function dbSetup() {
  console.log("Starting Prisma migration");
  const migrateResp = execSync("npx prisma migrate reset -f");
  console.log(migrateResp.toString());
  const seedResp = execSync('npx ts-node prisma/seed.ts');
  console.log(seedResp.toString());
}

function startOrCreateContainer() {
  if (containerQuery()) {
    console.log("Found existing container");
    const restartResp = execSync(`docker restart ${CONTAINER_NAME}`);
    console.log(restartResp.toString());
  } else {
    console.log("No existing container; creating. . .");
    const runString = createRunString();
    const runResp = execSync(runString);
    console.log(runResp.toString());
    // Left to its own devices, Docker returns success before Prisma can access it :(.
    setTimeout(() => dbSetup(), 1000);
  }
}

startOrCreateContainer();
// console.log(containerQuery());
// console.log(createRunString());
