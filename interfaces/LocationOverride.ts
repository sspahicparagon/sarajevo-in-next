import { Prisma } from "@prisma/client";
export type LocationFull = Partial<Prisma.locationGetPayload<{ select: { [K in keyof Required<Prisma.locationSelect>]: true } }>>;

export type LocationBase = Prisma.locationGetPayload<Prisma.locationArgs>;