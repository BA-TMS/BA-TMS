const { execSync } = require('child_process');

require('dotenv').config();

const CONTAINER_NAME = 'a2ztmspostgres';

function containerQuery() {
  const containerBuffer = execSync('docker ps -a');
  return containerBuffer.includes(CONTAINER_NAME);
}

function createRunString() {
  const envProps = [
    `-e POSTGRES_USER=${process.env.DB_USER}`,
    `-e POSTGRES_PASSWORD=${process.env.DB_PASSWORD}`,
    `-e POSTGRES_DB=${process.env.DB_NAME}`,
  ];

  const envString = envProps.join(' ');

  return `docker run --name ${CONTAINER_NAME} ${envString} -p 5432:5432 -d postgres`;
}

function dbSetup(verbose: boolean) {
  // Set up A2Z tables and seed them; requires an existing PG isntance.
  const migrateResp = execSync('npx prisma migrate reset -f');
  if (verbose) console.log(migrateResp.toString());
  const seedResp = execSync('npx ts-node prisma/seed.ts');
  if (verbose) console.log(migrateResp.toString());
}

function startOrCreateContainer(verbose: boolean) {
  // Create a new Docker container and invoke the DB setup.
  if (containerQuery()) {
    if (verbose) console.log('Found existing container; restarting. . .')
    const restartResp = execSync(`docker restart ${CONTAINER_NAME}`);
    if (verbose) console.log(`${restartResp.toString().trim()} restarted`);
  } else {
    const runString = createRunString();
    const runResp = execSync(runString);
    if (verbose) console.log(runResp.toString());
    // Left to its own devices, Docker returns success before Prisma can access it :(.
    setTimeout(() => dbSetup(verbose), 1000);
  }
}

function dispatcher(args: string[]) {
  const command = args[0];
  const verbose = (process.env.VERBOSE_SETUP === '1') || false;
  if (command === 'docker') {
    startOrCreateContainer(verbose);
  } else if (command === 'dbsetup') {
    dbSetup(verbose);
  }else {
    console.log(`${command} is not a registered command`);
  }
}

// startOrCreateContainer();
dispatcher(process.argv.slice(2));