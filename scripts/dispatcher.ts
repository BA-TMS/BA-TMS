const { execSync } = require('child_process');
require('dotenv').config();

const CONTAINER_NAME = process.env.DB_DOCKER_CONTAINER_NAME;
const CONTAINER_PORT=5432;
const HOST_PORT=process.env.DB_DOCKER_HOST_PORT;

function execWrap(command: string, verbose = false) {
  // Wrapper to handle errors and format responses.
  try {
    return execSync(command);
  } catch(error: any) {
    console.log(`Execution failed when trying to run ${command}`);
    if (verbose) {
      console.log('\nError trace:');
      console.error(error.stack);
    }
    process.exit();
  }
}

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

  return `docker run --name ${CONTAINER_NAME} ${envString} -p ${HOST_PORT}:${CONTAINER_PORT} -d postgres`;
}

function dbSetup(verbose: boolean) {
  // Set up A2Z tables and seed them; requires an existing PG isntance.
  const target = process.env.DATABASE_URL || '';
  if (!target.includes('localhost')) {
    console.log('DB Setup is only for local instances; run Supabase migrations manually');
    process.exit();
  }
  const migrateResp = execWrap('npx prisma migrate reset -f', verbose);
  if (verbose) console.log(migrateResp.toString());
  const seedResp = execWrap('npx ts-node prisma/seed.ts');
  if (verbose) console.log(seedResp.toString());
}

function startOrCreateContainer(verbose: boolean) {
  // Create a new Docker container and invoke the DB setup.
  if (containerQuery()) {
    if (verbose) console.log('Found existing container; restarting. . .');
    const restartResp = execWrap(`docker restart ${CONTAINER_NAME}`);
    if (verbose) console.log(`${restartResp.toString().trim()} restarted`);
  } else {
    const runString = createRunString();
    const runResp = execWrap(runString);
    if (verbose) console.log(runResp.toString());
    // Left to its own devices, Docker returns success before Prisma can access it :(.
    setTimeout(() => dbSetup(verbose), 1000);
  }
}

function deleteContainer(verbose: boolean) {
  if (containerQuery()) {
    if (verbose) console.log('Found existing container; stopping & deleting. . .');
    const stopResp = execWrap(`docker container stop ${CONTAINER_NAME}`);
    if (verbose) console.log(`${stopResp.toString().trim()} stopped`);
    const rmResp = execWrap(`docker container rm ${CONTAINER_NAME}`);
    if (verbose) console.log(`${rmResp.toString().trim()} removed`);
  } else {
    if (verbose) console.log('Can\'t find existing container, thus not deleting anything');
  }
}

function dispatcher(args: string[]) {
  const command = args[0];
  const verbose = (process.env.VERBOSE_SETUP === '1') || false;
  if (command === 'docker') {
    startOrCreateContainer(verbose);
  } else if (command === 'dbsetup') {
    dbSetup(verbose);
  } else if (command === 'delete-docker-container') {
    deleteContainer(verbose);
  }else {
    console.log(`${command} is not a registered command`);
  }
}

dispatcher(process.argv.slice(2));