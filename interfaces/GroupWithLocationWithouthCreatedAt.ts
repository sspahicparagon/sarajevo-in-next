import { Prisma } from "@prisma/client";
import GroupeService from '../services/GroupeService'

export type GroupWithLocationWithouthCreatedAt = Prisma.PromiseReturnType<typeof GroupeService.getGroupeWithLocationWithouthCreatedAt>