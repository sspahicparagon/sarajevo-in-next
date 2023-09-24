import { event_translation } from "@prisma/client";
import prismaClient from "../lib/prisma";

export type SaveTranslationProps = {
  eventID: number;
  translations: {[key: string]: string};
}

const TranslationServiceFunction = () => {
  const saveEventTranslation = async (props: SaveTranslationProps) => {
    Object.keys(props.translations).map(async (key:string) => {
      let keyWithNoLanguage = key.split('_')[0];
      let language = key.split('_')[1];

      const data = {
        EventID: props.eventID,
        Language: language,
        Key: keyWithNoLanguage,
        Translation: props.translations[key]
      };

      await prismaClient.event_translation.create({ data: data });
    });
  };

  const updateEventTranslation = async (props: SaveTranslationProps) => {
    await prismaClient.event_translation.deleteMany({ where: { EventID: props.eventID } });
    Object.keys(props.translations).map(async (key:string) => {
      let keyWithNoLanguage = key.split('_')[0];
      let language = key.split('_')[1];

      const data = {
        EventID: props.eventID,
        Language: language,
        Key: keyWithNoLanguage,
        Translation: props.translations[key]
      };

      await prismaClient.event_translation.create({ data: data });
    });
  }

  const getEventTranslation = (translations: event_translation[], key: string, language: string) => {
    return translations?.find(translation => translation.Key == key && translation.Language == language)?.Translation ?? '';
  }

  return {
    saveEventTranslation,
    getEventTranslation,
    updateEventTranslation
  }
}

export const TranslationService = TranslationServiceFunction();