import { Prisma, PrismaClient, custom_ad, custom_ad_type } from "@prisma/client";
import prismaClient from "../lib/prisma";
import { CustomAdFull, CustomAdTypeFull } from "../interfaces/CustomAd";

const AdServiceFunction = () => {
  const getAllAdTypes = async (): Promise<CustomAdTypeFull[]> => {
    return await prismaClient.custom_ad_type.findMany();
  };
  const getAdType = async (typeID: number | string): Promise<CustomAdTypeFull | null> => {
    return await prismaClient.custom_ad_type.findFirst({
      where: { CustomAdTypeID: typeof (typeID) == 'string' ? parseInt(typeID) : typeID }
    });
  };
  const deleteAdType = async (typeID: number | string): Promise<CustomAdTypeFull> => {
    return await prismaClient.custom_ad_type.delete({
      where: { CustomAdTypeID: typeof (typeID) == 'string' ? parseInt(typeID) : typeID }
    });
  };
  const saveAdType = async (adType: CustomAdTypeFull): Promise<CustomAdTypeFull> => {
    const data = {
      Width: adType.Width!,
      Height: adType.Height!
    };

    if (adType.CustomAdTypeID && adType.CustomAdTypeID > 0)
      return await prismaClient.custom_ad_type.update({
        data: data,
        where: {
          CustomAdTypeID: adType.CustomAdTypeID
        }
      });

    return await prismaClient.custom_ad_type.create({
      data: data
    });
  }
  const getAllAds = async (): Promise<CustomAdFull[]> => {
    return await prismaClient.custom_ad.findMany({
      include: {
        custom_ad_type: true
      },
      orderBy: {
        Order: 'asc'
      }
    });
  };
  const saveAdImage = async (adID: number | string, image: string): Promise<CustomAdFull> => {
    return await prismaClient.custom_ad.update({
      where: {
        CustomAdID: typeof (adID) == 'string' ? parseInt(adID) : adID
      },
      data: {
        Image: image
      }
    });
  };
  const deleteAd = async (adID: number | string): Promise<CustomAdFull> => {
    return await prismaClient.custom_ad.delete({
      where: {
        CustomAdID: typeof (adID) == 'string' ? parseInt(adID) : adID
      }
    });
  };
  const findLatestOrderForCustomAdType = async (adTypeID: number): Promise<number | undefined> => {
    let result = await prismaClient.custom_ad.findFirst({
      select: {
        Order: true
      },
      where: {
        CustomAdTypeID: adTypeID
      },
      orderBy: {
        Order: 'desc'
      }
    });

    return result?.Order;
  };
  const saveAd = async (ad: CustomAdFull): Promise<CustomAdFull> => {
    let data = {
      Image: ad.Image!,
      EndDate: ad.EndDate!,
      CreatedAt: ad.CreatedAt!,
      Order: ad.Order!,
      CustomAdTypeID: ad.CustomAdTypeID!,
      Name: ad.Name!,
      Url: ad.Url!,
      EditedAt: ad.CreatedAt!
    };

    if (ad.CustomAdID && ad.CustomAdID > 0) {
      data.EditedAt = new Date();

      return await prismaClient.custom_ad.update({
        where: {
          CustomAdID: ad.CustomAdID
        },
        data: data
      });
    }

  const latestOrder = await findLatestOrderForCustomAdType(ad.CustomAdTypeID!);
    data.Order = latestOrder ? latestOrder + 1 : 1

    return await prismaClient.custom_ad.create({
      data: data
    })
  };
  const updateAdOrder = async (ids: number[]) => {
    const customAds = await getAdsBulk(ids);

    ids.map((id, index) => {
      let customAd = customAds.find((ele) => ele.CustomAdID == id);
      if (customAd && customAd.Order != undefined) {
        customAd.Order = index + 1;
      }
    });

    await prismaClient.$transaction(async (tx) => {
      return customAds.map(async (ad) => {
        let data = {
          CustomAdID: ad.CustomAdID!,
          CustomAdTypeID: ad.CustomAdTypeID!,
          EditedAt: ad.EditedAt!,
          CreatedAt: ad.CreatedAt!,
          EndDate: ad.EndDate!,
          Image: ad.Image!,
          Name: ad.Name!,
          Order: ad.Order!
        };
        return await prismaClient.custom_ad.update({
          where: {
            CustomAdID: ad.CustomAdID
          },
          data: data
        })
      })
    });
  };
  const getAdsBulk = async (ids: number[]): Promise<CustomAdFull[]> => {
    return prismaClient.custom_ad.findMany({
      where: {
        CustomAdID: {
          in: ids
        }
      }
    });
  };
  const getAd = async (id: number | string): Promise<CustomAdFull | null> => {
    return await prismaClient.custom_ad.findFirst({
      where: {
        CustomAdID: typeof (id) == 'string' ? parseInt(id) : id
      }
    });
  };
  const getAdsByAdTypes = async(adTypes: CustomAdTypeFull[]): Promise<CustomAdFull[]> => {
    return await prismaClient.custom_ad.findMany({
      where: {
        custom_ad_type: {
          ...constructWhereQueryBasedOnAdType(adTypes)
        }
      },
      include: {
        custom_ad_type: true
      },
      orderBy: {
        Order: 'asc'
      }
    });
  };
  const constructWhereQueryBasedOnAdType = (adTypes: CustomAdTypeFull[]) => {
    let result: {OR: {AND: {Width: string, Height:string}}[]} = {OR: []};
    adTypes.map(adType => {
      result.OR.push({AND: {Width:adType.Width!, Height: adType.Height!}});
    });

    return result;
  }

  return {
    getAllAdTypes,
    getAdType,
    deleteAdType,
    saveAdType,
    getAllAds,
    saveAdImage,
    findLatestOrder: findLatestOrderForCustomAdType,
    saveAd,
    deleteAd,
    updateAdOrder,
    getAdsBulk,
    getAd,
    getAdsByAdTypes
  };
};

export const AdService = AdServiceFunction();