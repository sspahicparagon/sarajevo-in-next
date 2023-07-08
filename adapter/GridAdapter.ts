import { location } from "@prisma/client";
import { LocationGridItem } from "../interfaces/TemplateGridItem";

const GridAdapterFunction = () => {
  const adaptFromLocation = (location: location): LocationGridItem => {
    const item: LocationGridItem = {
      id: location.LocationID,
      image: location.Image,
      title: location.Name
    }
    return item;
  }

  const adaptFromLocationArray = (locations: location[]): LocationGridItem[] => {
    return locations.map(location => adaptFromLocation(location));
  }

  return {
    adaptFromLocation,
    adaptFromLocationArray
  }
};

export const GridAdapter = GridAdapterFunction();