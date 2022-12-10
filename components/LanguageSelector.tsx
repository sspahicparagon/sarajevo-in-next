import { Select } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import style from '../styles/LanguageSelector.module.css';
import { useRouter } from "next/router";

function capitalize(lang: string) {
    return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default function LanguageSelector({ onChange }: { onChange?: (locale: string) => unknown }) {
    const { i18n } = useTranslation('common');
    const { language: currentLanguage } = i18n;
    const router = useRouter();

    const getLanguages = () => {
        let locales = router.locales ?? [currentLanguage]
        locales.unshift(currentLanguage);
        return locales.filter((item: string, index: number) => locales.indexOf(item) === index);
    }

    const locales = getLanguages();

    const languageNames = useMemo(() => {
        return new Intl.DisplayNames([currentLanguage], {
            type: 'language'
        });
    }, [currentLanguage]);

    const [value, setValue] = useState({
        value: i18n.language,
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

    return (
        <Select
            onChange={languageChanged}
            width={'100px'}
            height={'32px'}
            className={`${style.container}`}
            color={'lightgray'}
            variant={'unstyled'}
            name={LanguageSelector.name}
        >
            {locales.map((language: string) => {
                return (
                    <option
                        value={language}
                        key={language}
                        className={style.option}
                    >
                        {capitalize(languageNames.of(language) ?? language)}
                    </option>
                )
            })}
        </Select>
    )
}