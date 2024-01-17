const { execSync } = require("child_process");

require("dotenv").config();

const CONTAINER_NAME= "a2ztmspostgres";

function containerQuery() {
  const containerBuffer = execSync("docker container ls");
  return containerBuffer.includes(CONTAINER_NAME);
}

// docker run --name a2zpg -e POSTGRES_PASSWORD=test -p 5432:5432 -d postgres
function createRunString() {
  const envProps = [
    `-e POSTGRES_USER=${process.env.DB_USER}`,
    `-e POSTGRES_PASSWORD=${process.env.DB_PASSWORD}`,
    `-e POSTGRES_DB=${process.env.DB_NAME}`
  ];

  const envString = envProps.join(" ");

  return `docker run --name ${CONTAINER_NAME} ${envString} -p 5432:5432 -d postgres`;
}

function startOrCreateContainer() {
  if (containerQuery()) {
    const restartResp = execSync(`docker restart ${CONTAINER_NAME}`);
    console.log(restartResp.toString());
  } else {
    const runString = createRunString();
    const runResp = execSync(runString);
    console.log(runResp.toString());
    const migrateResp = execSync("npx prisma migrate reset -f");
    console.log(migrateResp);
    const seedResp = execSync('npx ts-node prisma/seed.ts');
    console.log(seedResp);
  }
}

startOrCreateContainer();