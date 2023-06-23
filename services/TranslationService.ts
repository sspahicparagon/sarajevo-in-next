import { event_translation } from "@prisma/client";
import prismaClient from "../lib/prisma";

const TranslationServiceFunction = () => {
  const saveEventTranslation = async (eventID:number, params: {[key: string]: string}) => {
    Object.keys(params).map(async (key:string) => {
      let keyWithNoLanguage = key.split('_')[0];
      let language = key.split('_')[1];

      const data = {
        EventID: eventID,
        Language: language,
        Key: keyWithNoLanguage,
        Translation: params[key]
      };

      await prismaClient.event_translation.create({ data: data });
    });
  };

  const getEventTranslation = (translations: event_translation[], key: string, language: string) => {
    return translations?.find(translation => translation.Key == key && translation.Language == language)?.Translation ?? '';
  }

  return {
    saveEventTranslation,
    getEventTranslation
  }
}

export const TranslationService = TranslationServiceFunction();