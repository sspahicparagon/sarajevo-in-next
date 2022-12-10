import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Map from "../../components/Map";
import detailsStyle from "../../styles/Details.module.css";
import InformationService from "../../services/InformationService";
import InformationCard from "../../components/InformationCard";
import TableCard from "../../components/TableCard";
import { SSRConfig, useTranslation } from "next-i18next";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Loading from "../../components/Loading";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { location, worktime } from '@prisma/client';

const Details: NextPage<SSRConfig & { information: location & { worktime: worktime[] } }> = (props) => {
    const { t } = useTranslation('common');
    const router = useRouter();

    return (
        <>
            {props.information == undefined ?
                <Loading height={'calc(100vh - 40px)'} />
                :
                <Flex
                    flexDirection={'column'}
                    width={'100vw'}
                    className={detailsStyle.container}
                >
                    {/* <Head key={'location-name'}><span>{props.information?.Name}</span></Head> */}
                    <Flex
                        height={'20vh'}
                        width={'100%'}
                        className={detailsStyle['title-container']}
                        flexDirection={'row'}
                        position={'relative'}
                    >
                        <Flex
                            flexDirection={'column'}
                            position={'absolute'}
                            onClick={() => { router.push('/') }}
                            cursor={'pointer'}
                            className={'link-interaction'}
                        >
                            <ArrowBackIcon fontSize={'4xl'} color={'var(--color-gray)'} />
                        </Flex>
                        <Flex
                            className={detailsStyle['heading-text']}
                            flexDirection={'column'}
                            width={'100%'}
                        >
                            {props.information?.Name}
                        </Flex>
                    </Flex>
                    <Flex
                        flexDirection={'column'}
                        width={'100%'}
                        className={detailsStyle['information-container']}
                    >
                        <Flex
                            flexDirection={'row'}
                            className={`${detailsStyle['responsive']}`}
                        >
                            <Flex
                                flexDirection={'column'}
                                className={detailsStyle['information-card']}
                                width={'300px'}
                                height={'315px'}
                            >
                                <InformationCard title={t("kontakt-informacije").toString()} information={props.information} />
                            </Flex>
                            <br />
                            <Flex
                                flexDirection={'column'}
                                className={detailsStyle['information-card']}
                                width={'300px'}
                                height={'315px'}
                            >
                                <TableCard title={t("radno-vrijeme").toString()} worktime={props.information.worktime} />
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex
                        height={'100vh'}
                        width={'100%'}>
                        <Map lat={props.information.Latitude} long={props.information.Longitude} />
                    </Flex>
                </Flex>
            }
        </>
    );
}

export async function getStaticPaths(context: any) {
    let result = await InformationService.getAllLocationsWithouthCreatedAt();
    const paths = result.flatMap(_ => {
        return context.locales.map((locale: string) => {
            return {
                params: {
                    id: _.LocationID.toString()
                },
                locale: locale
            }
        });
    });
    return {
        paths: paths,
        fallback: 'blocking'
    }
}


export async function getStaticProps(context: any) {
    const response = await InformationService.getLocationWithouthCreatedAtForItem(context.params.id);
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            information: response,
            revalidate: 3600
        }
    }
}

export default Details;