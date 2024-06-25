import formidable from "formidable";
import { CustomAdFull, CustomAdTypeFull } from "../interfaces/CustomAd";
import { convertStringToNormalDate } from "../helpers/DateHelper";

const CustomAdFactoryFunction = () => {
  const groupByWidthAndHeight = (ads: CustomAdFull[]) => {
    const result: { [key: string]: CustomAdFull[] } = {};

    ads.map((ad) => {
      const key: string = `${ad.custom_ad_type?.Width}x${ad.custom_ad_type?.Height}`;

      if (result[key] == undefined) {
        result[key] = [];
      }

      result[key].push(ad);
    });

    return result;
  };

  const createCustomAdTypeFromFormFields = (fields: formidable.Fields) => {
    fields.CustomAdTypeID = fields.CustomAdTypeID == 'undefined' || !fields.CustomAdTypeID ? '-1' : fields.CustomAdTypeID;
    let customAdType: CustomAdTypeFull = {
      CustomAdTypeID: parseInt(fields.CustomAdTypeID.toString() ?? '-1'),
      Width: fields.Width.toString(),
      Height: fields.Height.toString()
    };
    return customAdType;
  };

  const createCustomAdFromFormFields = (fields: formidable.Fields) => {
    const editedAt = fields.EditedAt != 'undefined' ? fields.EditedAt.toString() : fields.CreatedAt.toString();

    let customAd: CustomAdFull = {
      CustomAdID: parseInt(fields.CustomAdID.toString() ?? '-1'),
      Name: fields.Name.toString(),
      Url: fields.Url.toString(),
      Order: parseInt(fields.Order.toString() ?? '-1'),
      Image: fields.Image?.toString() == undefined ? 'TEMPORARY' : fields.Image.toString(),
      CreatedAt: convertStringToNormalDate(fields.CreatedAt.toString()),
      EditedAt: convertStringToNormalDate(editedAt),
      EndDate: convertStringToNormalDate(fields.EndDate.toString()),
      CustomAdTypeID: parseInt(fields.CustomAdTypeID.toString() ?? '-1')
    };

    return customAd;
  }

  return {
    groupByWidthAndHeight,
    createCustomAdTypeFromFormFields,
    createCustomAdFromFormFields
  }
};

export const CustomAdFactory = CustomAdFactoryFunction();