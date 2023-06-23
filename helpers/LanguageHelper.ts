import { SSRConfig } from "next-i18next"

const LanguageHelperFunction = () => {
    const languageCodeBeingUsed = (context: SSRConfig | undefined) => {
        return getLanguageSafe(context?._nextI18Next?.initialLocale);
    }

    const getLanguageSafe = (language: string | undefined | null) => {
        return language ?? 'en'
    };

    return {
        languageCodeBeingUsed,
        getLanguageSafe
    }
}

export const LanguageHelper = LanguageHelperFunction();