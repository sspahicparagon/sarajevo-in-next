// import { Prisma } from "@prisma/client";
import axios from "axios";
import prismaClient from '../lib/prisma'

const InformationService = {
    getLocations: async () => {
        return await prismaClient.location.findMany();
    },
    getLocationWithWorkTime: async function (id: string) {
        let response = await prismaClient.location.findUnique({
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