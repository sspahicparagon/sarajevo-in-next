import { Prisma } from "@prisma/client";

type CustomAdOverride<Key extends keyof Prisma.custom_adSelect> = Omit<CustomAdFull, Key>;
type CustomAdTypeOverride<Key extends keyof Prisma.custom_ad_typeSelect> = Omit<CustomAdTypeFull, Key>;


// Can be helpful later!!
// type DeepPartial<T> = {
//     [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
// };

export type CustomAdFull = Partial<Prisma.custom_adGetPayload<{ select: { [K in keyof Required<Prisma.custom_adSelect>]: true } }>>;

export type CustomAdTypeFull = Partial<Prisma.custom_ad_typeGetPayload<{ select: { [K in keyof Required<Prisma.custom_ad_typeSelect>]: true } }>>;
