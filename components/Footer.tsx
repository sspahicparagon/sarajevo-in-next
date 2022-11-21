import { Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import footerStyle from '../styles/Footer.module.css';
import { InstagramLink } from '../values/GlobalValues';

export default function Footer() {
    let people: string[] = ['_goropro_', 'oljahaj', 'nera.hadzic', 'merimam', 'mirela_red'];
    const { t } = useTranslation();
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
                        people.map((person: string, index: number) => {
                            return (
                                <Flex
                                    flexDirection={'row'}
                                    key={person}
                                    className={footerStyle.names}
                                >
                                    <Flex
                                        flexDirection={'column'}
                                    >
                                        <a href={`${InstagramLink}${person}/`}>{person}</a>
                                    </Flex>
                                </Flex>
                            )
                        })
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}