import { Prisma } from "@prisma/client";
import InformationService from "../services/InformationService";

export type LocationWithoutCreatedAt = Prisma.PromiseReturnType<typeof InformationService.getLocationWithouthCreatedAt>