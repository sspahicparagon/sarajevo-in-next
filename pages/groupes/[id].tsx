import { Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { groupe, location } from "@prisma/client";
import { NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../../components/ImageCard";
import PageTitle from "../../components/PageTitle";
import imageLoader from "../../lib/imageLoader";
import { getPagePaths } from "../../lib/pageRouter";
import GroupService from "../../services/GroupeService";
import groupeStyle from "../../styles/Groupe.module.css";
import SEO from "../../components/SEO";
import { TranslationType } from "../../interfaces/TranslationType";

const Groupes: NextPage<SSRConfig & { groupe: groupe & { location: location[] } }> = (props) => {
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);
    const { groupe } = props;
    const { locale } = useRouter();
    let title = "SarajevoIN - " + t(`${groupe?.Name}`) ?? "";

    const handleScrollPosClick = () => {
        sessionStorage.setItem("scrollPos", window.scrollY.toString());
    }

    useEffect(() => {
        const scrollPos = parseInt(sessionStorage.getItem("scrollPos") ?? "0")
        if (scrollPos != 0) {
            setTimeout(() => {
                window.scrollTo(0, scrollPos);
                sessionStorage.removeItem("scrollPos");
            }, 10);
        }
    }, []);

    return (
        <>
            <PageTitle title={t(groupe?.Name) ?? ""} />
            <SEO 
                title={title}
                description={t(`${groupe?.Name}-Description`)}
                imageUrl={imageLoader({ src: groupe?.location[0]?.Image })}
                canonicalRelativeRoute={`/groupes/${groupe.GroupeID}`}
            />
            <Flex
                className={`center ${groupeStyle.container}`}
            >
                <main>
                    <Grid
                        className={`center ${groupeStyle['grid-container']}`}
                    >
                        {
                            groupe?.location?.map((location: location) => {
                                return (
                                    <Link
                                        href={{ pathname: '/details/[id]', query: { id: location.LocationID } }}
                                        locale={locale}
                                        key={Math.random()}
                                    >
                                        <Grid
                                            height={'400px'}
                                            className={groupeStyle['card-container']}
                                            onClick={handleScrollPosClick}
                                        >
                                            <Flex
                                                height={'325px'}
                                                width={'100%'}
                                                flexDirection={'column'}
                                                position={'relative'}
                                            >
                                                <Card image={location.Image} enableClick={false} alt={location.Name ?? ""} />
                                            </Flex>
                                            <Flex
                                                width={'100%'}
                                                height={'75px'}
                                                flexDirection={'column'}
                                                className={`center ${groupeStyle['card-text-container']}`}
                                            >
                                                <Heading
                                                    as={'h2'}
                                                    fontSize={{ 'base': '1xl' }}
                                                    textAlign={'center'}
                                                >
                                                    {location.Name}
                                                </Heading>
                                            </Flex>
                                        </Grid>
                                    </Link>
                                )
                            })
                        }
                    </Grid>
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