import { Prisma } from "@prisma/client";
import { LocationFull } from "../interfaces/LocationOverride";
import prismaClient from "../lib/prisma";

const LocationServiceFunction = () => {
  const getAllLocations = async(): Promise<LocationFull[]> => {
    let result = await prismaClient.location.findMany({
      include: {
        groupe: true
      },
      orderBy: [
        {
          groupe: { Name: 'asc' }
        },
        {
          Name: 'asc'
        }
      ]
    })

    return result;
  };

  const deleteLocation = async(locationID: string) => {
    if(locationID == '-1') return;
    return await prismaClient.location.delete({ where: { LocationID: parseInt(locationID) } });
  }

  const getLocation = async(locationID: string): Promise<LocationFull | null> => {
    return await prismaClient.location.findFirst({
      where: {
        LocationID: parseInt(locationID)
      },
      include: {
        groupe: true
      }
    });
  }

  const saveLocation = async(name: string, groupID: number, latitude: string, longitude: string, image: string) => {
    const data: Prisma.XOR<Prisma.locationCreateInput, Prisma.locationUncheckedCreateInput> = {
      Image: image,
      Name: name,
      GroupeID: groupID,
      Latitude: latitude,
      Longitude: longitude
    };

    return await prismaClient.location.create({
      data: data
    });
  }

  return {
    getAllLocations,
    deleteLocation,
    getLocation,
    saveLocation
  }
}

export const LocationService = LocationServiceFunction();