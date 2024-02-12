const { execSync } = require("child_process");
const dbSetup = require('dbsetup');

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

function startOrCreateContainer() {
  if (containerQuery()) {
    const restartResp = execSync(`docker restart ${CONTAINER_NAME}`);
  } else {
    const runString = createRunString();
    const runResp = execSync(runString);
    // Left to its own devices, Docker returns success before Prisma can access it :(.
    setTimeout(() => dbSetup(), 1000);
  }
}

startOrCreateContainer();
