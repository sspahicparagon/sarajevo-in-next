import { Flex, Heading, Text } from "@chakra-ui/react";
import { groupe, location } from "@prisma/client";
import { NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../../components/ImageCard";
import PageTitle from "../../components/PageTitle";
import useDisplayItemsCount from "../../hooks/useDisplayItemsCount";
import imageLoader from "../../lib/imageLoader";
import { getPagePaths } from "../../lib/pageRouter";
import GroupService from "../../services/GroupeService";
import groupeStyle from "../../styles/Groupe.module.css";

const Groupes: NextPage<SSRConfig & { groupe: groupe & { location: location[] } }> = (props) => {
    const { t } = useTranslation(props._nextI18Next?.ns);
    const displayItemsCount = useDisplayItemsCount();
    const { groupe } = props;
    const { locale } = useRouter();

    return (
        <>
            <PageTitle title={t(groupe.Name) ?? ""} />
            <Flex
                className={`center ${groupeStyle.container}`}
            >
                <main>
                    <Flex
                        margin={'auto'}
                        flexDirection={'column'}
                        className={`center`}
                    >
                        {
                            groupe.location.map((location: location) => {
                                return (
                                    <Link
                                        href={{ pathname: '/details/[id]', query: { id: location.LocationID } }}
                                        locale={locale}
                                        key={location.Name}
                                    >
                                        <Flex
                                            width={displayItemsCount <= 2 ? '90%' : displayItemsCount <= 4 ? '70%' : '50%'}
                                            height={'400px'}
                                            flexDirection={'column'}
                                            className={groupeStyle['card-container']}
                                        >
                                            <Flex
                                                height={'80%'}
                                                width={'100%'}
                                                flexDirection={'column'}
                                                position={'relative'}
                                            >
                                                <Card image={location.Image} enableClick={false} />
                                            </Flex>
                                            <Flex
                                                flexDirection={'column'}
                                                width={'100%'}
                                                height={'20%'}
                                                alignItems={'center'}
                                                margin={'auto'}
                                                justifyContent={'flex-end'}
                                            >
                                                <Flex
                                                    width={'100%'}
                                                    height={'100%'}
                                                    flexDirection={'column'}
                                                    className={`center ${groupeStyle['card-text-container']}`}
                                                >
                                                    <Heading
                                                        as={'h2'}
                                                        fontSize={displayItemsCount <= 3 ? '1xl' : '2xl'}
                                                        textAlign={'center'}
                                                    >
                                                        {location.Name}
                                                    </Heading>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Link>
                                )
                            })
                        }
                    </Flex>
                </main>
            </Flex>
        </>
    )
};

export async function getStaticPaths(context: any) {
    let groupes = await GroupService.getGroupes();

    let pathsForName = getPagePaths(context, groupes, 'Name');
    let paths = [...pathsForName, ...getPagePaths(context, groupes, 'GroupeID')];
    return {
        paths: paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps(context: any) {
    let result: number = parseInt(context.params.id);

    let groupe = isNaN(result) ? await GroupService.getGroupeWithLocationByName(context.params.id) : await GroupService.getGroupeWithLocationByID(result);

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
            groupe: groupe,
            revalidate: 3600
        }
    }
}

export default Groupes;