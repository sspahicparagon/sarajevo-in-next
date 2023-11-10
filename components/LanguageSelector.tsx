import { Select } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import style from '../styles/LanguageSelector.module.css';
import { useRouter } from "next/router";
import { LanguageHelper } from "../helpers/LanguageHelper";

function capitalize(lang: string) {
    return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default function LanguageSelector({ onChange }: { onChange?: (locale: string) => unknown }) {
    const router = useRouter();
    const currentLanguage = LanguageHelper.getLanguageSafe(router.locale);

    const getLanguages = () => {
        let locales = router.locales ?? [currentLanguage]
        locales.unshift(currentLanguage);
        return locales.filter((item: string, index: number) => locales.indexOf(item) === index);
    }

    const locales = getLanguages();

    const languageNames = useMemo(() => {
        if(currentLanguage == 'bs')
            return new Intl.DisplayNames(['sr-Latn-BA'], {
                type: 'language'
            });
        else {
            return new Intl.DisplayNames([currentLanguage], {
                type: 'language'
            });
        }
    }, [currentLanguage]);

    const [value, setValue] = useState({
        value: currentLanguage,
        label: capitalize(languageNames.of(currentLanguage) ?? currentLanguage)
    })

    const switchToLocale = useCallback((locale: string) => {
        const path = router.asPath;
        return router.push(path, path, { locale })
    }, [router]);

    const languageChanged = useCallback(
        async (option: ChangeEvent<HTMLSelectElement>) => {
            setValue({ value: option.currentTarget.value, label: option.currentTarget.name });
            const locale = option.currentTarget.value;
            if (onChange) {
                onChange(locale);
            }

            await switchToLocale(locale)
        }, [switchToLocale, onChange]
    )

    const bosnianLanguageNames: {[key: string]: string} = {
        'en': 'Engleski',
        'de': 'Njemački',
        'bs': 'Bosanski'
    }
    return (
        <Select
            onChange={languageChanged}
            width={{'base': '85px', 'md': '100px'}}
            height={'32px'}
            className={`${style.container}`}
            color={'lightgray'}
            variant={'unstyled'}
            name={LanguageSelector.name}
            fontSize={{'base': 'small', 'md': 'medium'}}
        >
            {locales.map((language: string) => {
                return (
                    <option
                        value={language}
                        key={language}
                        className={style.option}
                    >
                        {capitalize(languageNames.of(language) ?? bosnianLanguageNames[`${language}`])}
                    </option>
                )
            })}
        </Select>
    )
}