import { Prisma } from "@prisma/client";

type EventOverride<Key extends keyof Prisma.eventSelect> = Omit<EventFull, Key>;

// Can be helpful later!!
// type DeepPartial<T> = {
//     [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
// };

export type EventFull = Partial<Prisma.eventGetPayload<{ select: { [K in keyof Required<Prisma.eventSelect>]: true } }>>;

export type EventBase = Prisma.eventGetPayload<Prisma.eventArgs>;

export type EventHTMLSafe = EventOverride<'Price'> & { Price: number }


