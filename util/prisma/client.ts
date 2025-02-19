import { PrismaClient } from '@prisma/client';

// create a single PrismaClient to be reused throughout app

const prisma = new PrismaClient();

export default prisma;
