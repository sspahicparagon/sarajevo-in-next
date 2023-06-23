function LanguageServiceFunction() {

    const getLanguageList = function (localStorage: Storage) {
        const languages: string[] = ['bs', 'en', 'de'];

        const selectedLanguage: string | null = localStorage.getItem('language');

        if (selectedLanguage != null) {
            languages.unshift(selectedLanguage!!);
            return languages.filter((item: string, index: number) => languages.indexOf(item) === index);
        }

        return languages;
    };
    const setLanguage = function (language: string, localStorage: Storage) {
        localStorage.setItem('language', language);
    };

    return {
        getLanguageList,
        setLanguage
    }
}

export const LanguageService = LanguageServiceFunction();