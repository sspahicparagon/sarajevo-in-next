// import { Prisma } from "@prisma/client";
import axios from "axios";
import prisma from '../lib/prisma'

const InformationService = {
    getLocations: async () => {
        return await prisma.location.findMany();
    },
    getLocationWithWorkTime: async function (id: string) {
        let response = await prisma.location.findUnique({
            where: {
                LocationID: parseInt(id ?? "")
            },
            include: {
                worktime: true
            }
        });
        return response;
    }
};

export default InformationService;