import {ChangeEvent, useCallback, useState} from "react";
import {addMonthsToDate} from "../helpers/DateHelper";
import {CustomAdFull, CustomAdTypeFull} from "../interfaces/CustomAd";
import {useRouter} from "next/router";
import {Prisma} from "@prisma/client";
import {ImageUploadKeyValue} from "../values/GlobalValues";
import axios, {HttpStatusCode} from "axios";

export interface UseFormAdProps {
  adTypes: CustomAdTypeFull[];
  sentValues?: CustomAdFull;
  action: string;
  method: string;
};

const useFormAd = ({adTypes, sentValues, action, method} : UseFormAdProps) => {

  const initialValues: CustomAdFull = {
    'CustomAdTypeID': adTypes.at(0) ?. CustomAdTypeID,
    'CustomAdID': -1,
    'EndDate': addMonthsToDate(),
    'CreatedAt': new Date(),
    'Name': '',
    'Url': 'https://google.com',
    'Order': -1,
    'EditedAt': undefined,
    'Image': ''
  };

  const [formValues, setFormValues] = useState < CustomAdFull > (sentValues ?? initialValues);
  const {push} = useRouter();
  const [isLoading, setIsLoading] = useState < boolean > (false);
  const [image, setImage] = useState < File | null > (null);

  const updateFormValue = (key : string, value : string | Date) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [key]: value
      }
    });
  };

  const updateImage = (img : File) => {
    setImage(img);
  }

  const createFormData = () : FormData => {
    const formData = new FormData();
    formData.set(ImageUploadKeyValue, image !);
    formData.append(Prisma.Custom_adScalarFieldEnum.CustomAdID, formValues.CustomAdID ?. toString()!);
    formData.append(Prisma.Custom_adScalarFieldEnum.CustomAdTypeID, formValues.CustomAdTypeID ?. toString()!);
    formData.append(Prisma.Custom_adScalarFieldEnum.CreatedAt, formValues.CreatedAt ?. toString()!);
    formData.append(Prisma.Custom_adScalarFieldEnum.EditedAt, formValues.EditedAt ?. toString()!);
    formData.append(Prisma.Custom_adScalarFieldEnum.EndDate, formValues.EndDate ?. toString()!);
    formData.append(Prisma.Custom_adScalarFieldEnum.Name, formValues.Name !);
    formData.append(Prisma.Custom_adScalarFieldEnum.Url, formValues.Url!);
    formData.append(Prisma.Custom_adScalarFieldEnum.Image, formValues.Image !);
    formData.append(Prisma.Custom_adScalarFieldEnum.Order, formValues.Order ?. toString()!);
    return formData;
  };

  const onSubmit = useCallback(async (event : ChangeEvent < HTMLFormElement >) => {
    event.preventDefault();

    const body = createFormData();
    setIsLoading(true);

    let res = await axios({
        url: `/api/ad/${
        action
      }`,
      data: body,
      method: method
    });

    if (res.status == HttpStatusCode.Ok) {
      setIsLoading(false);
      return push('/admin-ad');
    }
  }, [formValues, image]);

  return {
    updateFormValue,
    onSubmit,
    updateImage,
    formValues,
    isLoading
  };
};

export default useFormAd;

