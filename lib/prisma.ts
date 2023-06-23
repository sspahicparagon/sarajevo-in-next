import { PrismaClient } from '@prisma/client';

const globalFromPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
};

const prismaClient: PrismaClient  = globalFromPrisma.prisma ?? new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalFromPrisma.prisma = prismaClient;

export default prismaClient;