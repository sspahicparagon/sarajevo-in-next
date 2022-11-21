import { worktime } from "@prisma/client";

export default class WorkTime {
    DayOfWeek?: number;
    OpenTime: string = "";
    CloseTime: string = "";
}