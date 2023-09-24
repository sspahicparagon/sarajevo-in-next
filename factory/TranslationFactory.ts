import formidable from "formidable"
import { SaveTranslationProps } from "../services/TranslationService";

const TranslationFactoryFunction = () => {
  const createTranslationFromFormFields = (eventID: number, fields: formidable.Fields) => {
    let translations: SaveTranslationProps = {
      eventID: eventID,
      translations: { 
        'description_en': fields.description_en.toString(), 
        'description_bs': fields.description_bs.toString(),
        'description_de': fields.description_de.toString()
      }
    }

    return translations;
  };

  return {
    createTranslationFromFormFields
  }
};

export const TranslationFactory = TranslationFactoryFunction();