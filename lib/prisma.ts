import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

declare global {
    var prisma: PrismaClient;
}

if (process.env.NODE_ENV === 'production') {
    prismaClient = new PrismaClient();
} else {
    if (global.prisma == undefined) {
        global.prisma = new PrismaClient();
    }
    prismaClient = global.prisma;
    prismaClient = new PrismaClient()
}

export default prismaClient;