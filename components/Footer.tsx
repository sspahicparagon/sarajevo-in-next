import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import footerStyle from '../styles/Footer.module.css';
import { InstagramLink } from '../values/GlobalValues';
import { TranslationType } from "../interfaces/TranslationType";
import NavBar from './NavBar';

export default function Footer() {
    let people: string[][] = [['_goropro_', 'oljahaj', 'nera.hadzic'], ['merimam', 'mirela_red']];
    const { t } = useTranslation<TranslationType>('footer');
    return (
        <Flex
            flexDirection={'column'}
            className={footerStyle.container}
        >
            <Flex
                flexDirection={'row'}
                className={footerStyle['title-container']}
            >

                <Flex
                    flexDirection={'column'}
                >
                    <div>
                        <strong>{t("kredit-za-fotografije")}</strong>
                    </div>
                </Flex>
            </Flex>
            <Flex
                flexDirection={'row'}
                className={footerStyle['names-container']}
            >
                <Flex
                    flexDirection={'column'}
                >
                    {
                        people.map((persons: string[]) => {
                            return (
                                <Flex
                                    flexDirection={'row'}
                                    margin={'auto'}
                                    key={persons.length}
                                    className={footerStyle.names}
                                >
                                    {persons.map((person: string) => {
                                        return (
                                            <Flex
                                                flexDirection={'column'}
                                                key={person}
                                                className={footerStyle.name}
                                            >
                                                <a href={`${InstagramLink}${person}/`} className={'a-tag link-interaction'}>{person}</a>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )
                        })
                    }
                </Flex>
            </Flex>
            <Flex justify={'center'} align={'center'}>
                <NavBar />
            </Flex>
        </Flex>
    )
}