import { SSRConfig } from "next-i18next"

const LanguageHelperFunction = () => {
    const languageCodeBeingUsed = (context: SSRConfig | undefined) => {
        return context?._nextI18Next?.initialLocale ?? 'en';
    }

    return {
        languageCodeBeingUsed
    }
}

export const LanguageHelper = LanguageHelperFunction();