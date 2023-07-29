import { Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { groupe, location } from "@prisma/client";
import { NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { getPagePaths } from "../../lib/pageRouter";
import GroupService from "../../services/GroupeService";
import groupeStyle from "../../styles/Groupe.module.css";
import SEO from "../../components/SEO";
import { TranslationType } from "../../interfaces/TranslationType";
import DynamicGrid from "../../components/Grid/DynamicGrid";
import { GridAdapter } from "../../adapter/GridAdapter";
import LocationGrid from "../../components/Grid/LocationGrid";

const Groupes: NextPage<SSRConfig & { groupe: groupe & { location: location[] } | null }> = (props) => {
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);
    const { groupe } = props;
    const router = useRouter();

    useEffect(() => {
        if(groupe == null) router.push('/404');
    })

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
            <PageTitle title={t(groupe?.Name!) ?? ""} />
            <SEO 
                title={title}
                description={t(`${groupe?.Name}-Description`)}
                imageUrl={groupe?.location[0]?.Image}
                canonicalRelativeRoute={`/groupes/${groupe?.GroupeID}`}
            />
            <Flex
                className={`center ${groupeStyle.container}`}
            >
                <main>
                    <DynamicGrid 
                        array={GridAdapter.adaptFromLocationArray(groupe?.location) ?? []}
                        linkEndpoint={'details'}
                        handleScrollPosClick={handleScrollPosClick}
                        child={<LocationGrid />}
                    />
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