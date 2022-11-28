import { Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageService from "../services/LanguageService";
import style from '../styles/LanguageSelector.module.css';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [languages, setLanguages] = useState<string[]>([]);

    useEffect(() => {
        const langs: string[] = LanguageService.getLanguageList(localStorage);
        handleLanguageChangeWithString(langs[0]);
        setLanguages(langs);
    }, []);

    function handleLanguageChange(e: ChangeEvent<HTMLSelectElement>) {
        if (e.currentTarget.value != undefined) {
            i18n.changeLanguage(e.currentTarget.value);
            LanguageService.setLanguage(e.currentTarget.value, localStorage);
        }
    }

    function handleLanguageChangeWithString(language: string) {
        if (language != undefined) {
            i18n.changeLanguage(language);
        }
    }
    return (
        <Select
            onChange={handleLanguageChange}
            width={'80px'}
            height={'32px'}
            className={`${style.container}`}
            color={'lightgray'}
            variant={'unstyled'}
            name={LanguageSelector.name}
        >
            {languages.map((language: string) => {
                return (
                    <option
                        value={language}
                        key={language}
                        className={style.option}
                    >
                        {language}
                    </option>
                )
            })}
        </Select>
    )
}