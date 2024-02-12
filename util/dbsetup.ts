export default function dbSetup() {
  const migrateResp = execSync("npx prisma migrate reset -f");
  const seedResp = execSync('npx ts-node prisma/seed.ts');
}
