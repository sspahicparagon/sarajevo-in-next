const LanguageService = {
    getLanguageList: function (localStorage: Storage) {
        const languages: string[] = ['BS', 'EN', 'DE'];

        const selectedLanguage: string | null = localStorage.getItem('language');

        if (selectedLanguage != null) {
            languages.unshift(selectedLanguage!!);
            return languages.filter((item: string, index: number) => languages.indexOf(item) === index);
        }

        return languages;
    },
    setLanguage: function (language: string, localStorage: Storage) {
        localStorage.setItem('language', language);
    }
}

export default LanguageService;