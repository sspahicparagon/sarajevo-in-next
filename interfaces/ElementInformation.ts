import { worktime } from "@prisma/client";
import WorkTime from "./WorkTime";

export default interface ElementInformation {
    Phone: string | null;
    Adresa: string | null;
    Website: string | null;
    worktime?: worktime[];
    Name: string | null;
    Latitude: string | null;
    Longitude: string | null;
}