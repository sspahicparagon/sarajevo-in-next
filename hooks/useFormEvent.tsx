import axios, { HttpStatusCode } from "axios";
import { NextRouter, useRouter } from "next/router";
import { ChangeEvent, FormEventHandler, useCallback, useState } from "react";
import { ImageUploadKeyValue } from "../values/GlobalValues";
import { RRule, rrulestr } from "rrule";
import { convertDateValueToDate } from "../helpers/DateHelper";
import { Value } from "react-calendar/dist/cjs/shared/types";

export interface FormEvent extends Record<string, string | undefined> {
  eventName?: string,
  time?: string,
  location?: string,
  date?: string,
  price?: string,
  repeatFrequency?: string,
  description_de?: string,
  description_en?: string,
  description_bs?: string,
  uploadedImage?: string,
  eventID?: string,
  rruleSet?: string,
};

const useFormEvent = (sentValues: FormEvent, action: string, method: string, router: NextRouter) => {
  const defaultValues: FormEvent = {
    eventName: '',
    time: '00:00',
    location: '64',
    date: new Date().toLocaleDateString(),
    price: '-1',
    repeatFrequency: '-1',
    description_de: '',
    description_en: '',
    description_bs: '',
    uploadedImage: '',
    eventID: '-1',
    rruleSet: ''
  };

  const repeatFrequency: {[key: string]: number} = {
    "No repeat": -1,
    'Daily': RRule.DAILY,
    'Monthly': RRule.MONTHLY,
    'Weekly': RRule.WEEKLY,
    'Yearly': RRule.YEARLY
};

const repeatFrequencyKeys = useCallback(() => Object.keys(repeatFrequency), []);
  const [formValues, setFormValues] = useState<FormEvent>({ ...defaultValues, ...sentValues });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File>();

  const updateFormValue = (key: string, value: string) => {
    setFormValues((prev) => { return { ...prev, [key]: value } });
  };

  const updateFormValueThroughChangeEvent = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    updateFormValue(event.currentTarget.name, event.currentTarget.value);
  };

  const createFormData = (): FormData => {
    const formData = new FormData();
    formData.set(ImageUploadKeyValue, image!);
    Object.keys(defaultValues).map((key) => {
        formData.append(key, formValues[key] ?? '');
    });
    return formData;
}

  const onSubmit = useCallback(async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = createFormData();    
    setIsLoading(true);

    let res = await axios({
        url: `/api/event/${action}`,
        data: body,
        method: method
    });
    if(res.status == 200) {
      setIsLoading(false);
        router.push('/admin-event');
        return;
    }
  }, [formValues]);

  const handleDelete = useCallback(async() => {
    setIsLoading(true);
    let result = await axios({
        url: '/api/event/delete',
        data: { eventID: formValues.eventID },
        method: 'DELETE'
    });
    setIsLoading(false);
    if(result.status == HttpStatusCode.Ok) return router.push('/admin-event');
      //else Display toast message that something went wrong
  }, [formValues.eventID]);

  const updateImage = (img: File) => {
    updateFormValue('uploadedImage', '');
    setImage(img);
  };

  const updateRRuleSet = (value: Value) => {
    if(formValues.rruleSet != defaultValues.rruleSet && formValues.repeatFrequency != defaultValues.repeatFrequency) {
      let rruleSet = rrulestr(formValues.rruleSet!);
      rruleSet.origOptions.dtstart = convertDateValueToDate(value);
      updateFormValue('rruleSet', rruleSet.toString());
  }
  }

  return { 
    formValues, 
    updateFormValue, 
    updateFormValueThroughChangeEvent, 
    onSubmit, 
    isLoading, 
    handleDelete, 
    updateImage,
    repeatFrequency,
    repeatFrequencyKeys: repeatFrequencyKeys(),
    updateRRuleSet 
  };
};

export default useFormEvent