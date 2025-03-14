import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Map from "../../components/Map";
import detailsStyle from "../../styles/Details.module.css";
import InformationService from "../../services/InformationService";
import InformationCard from "../../components/InformationCard";
import TableCard from "../../components/TableCard";
import { SSRConfig, useTranslation } from "next-i18next";
import Loading from "../../components/Loading";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { location, worktime } from '@prisma/client';
import { getPagePaths } from "../../lib/pageRouter";
import PageTitle from "../../components/PageTitle";
import { AdFormatsPerPage, NumberOfSentencesInParagraph, RedisKeys } from "../../values/GlobalValues";
import SEO from "../../components/SEO";
import { TranslationType } from "../../interfaces/TranslationType";
import NormalAd from "../../components/ad/NormalAd";
import { CustomAdFactory } from "../../factory/CustomAdFactory";
import cache from "../../lib/cache";
import { CustomAdFull, CustomAdTypeFull } from "../../interfaces/CustomAd";
import { AdService } from "../../services/AdService";
import useAdManager from "../../hooks/useAdManager";


const Details: NextPage<SSRConfig & { information: location & { worktime: worktime[] }, groupedAds: {[key: string]: CustomAdFull[]} }> = (props) => {
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);
    const title = "SarajevoIN - " + [props.information?.Name];
    const { getAd } = useAdManager(props.groupedAds);

    const handleDisplayedText = (text: string): string[] => { 
        let textSplitOnPunctuation: string[]= text.split('.').filter(ele => ele != "" && ele != " ");
        let stringThatHoldsSentences: string = "";
        let resultParagraphArray: string[] = [];
        let numberOfSentences: number = 0;

        textSplitOnPunctuation.forEach((sentence: string, index: number) => {
            stringThatHoldsSentences += sentence + ".";
            numberOfSentences++;

            //Check so that there are no occurences where there is only one sentence in the paragraph
            if((numberOfSentences == NumberOfSentencesInParagraph && index + numberOfSentences < textSplitOnPunctuation.length) 
                //Check if there are remaining sentences to be added
                || index == textSplitOnPunctuation?.length - 1) {

                resultParagraphArray.push(stringThatHoldsSentences);
                //Reset
                stringThatHoldsSentences = "";
                numberOfSentences = 0;
            }
        });

        return resultParagraphArray;
    }

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
                    <SEO
                        title={title}
                        description={t(`description-${props.information?.LocationID}`)} 
                        imageUrl={props.information?.Image}
                        canonicalRelativeRoute={`/details/${props.information.LocationID}`}
                    />
                    <PageTitle title={props.information?.Name ?? ""} />
                    <main style={{ width: '100%' }}>
                        <Flex
                            flexDirection={'column'}
                            width={'100%'}
                            className={detailsStyle['information-container']}
                        >
                            <Flex
                                flexDirection={{ 'base': 'column', 'lg': 'row' }}
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
                                    justify={'center'}
                                >
                                    <NormalAd customAd={getAd(300,315)} condition={true} />
                                </Flex>
                                <br />
                                <Flex
                                    flexDirection={'column'}
                                    className={detailsStyle['information-card']}
                                    width={'300px'}
                                    height={'315px'}
                                >
                                    {props.information?.worktime.length > 0 ?
                                        <TableCard title={t("radno-vrijeme").toString()} worktime={props.information?.worktime} />
                                        :
                                        <Flex
                                            flexDirection={'column'}
                                            minHeight={'100%'}
                                        >
                                            <Box
                                                display={'block'}
                                                alignSelf={'center'}
                                            >
                                                <Heading
                                                    as={'h2'}
                                                    fontSize={'large'}
                                                >
                                                    <b>{t('Description')}</b>
                                                </Heading>
                                            </Box>
                                            <hr />
                                            <Flex
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                margin={'auto'}
                                            >
                                                <Text textAlign={'center'}>
                                                    {t(`description-short-${props.information?.LocationID}`)}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    }
                                </Flex>
                            </Flex>
                        </Flex>
                        {/* <NormalAd width='900' height='250' /> */}
                        {(t(`description-${props.information.LocationID}`) != `description-${props.information?.LocationID}`) &&
                            <Flex
                                flexDirection={'column'}
                                maxWidth={'1440px'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                textAlign={'justify'}
                                margin={'auto'}
                                paddingInline={'2rem'}
                            >
                                {
                                    handleDisplayedText(t(`description-${props.information.LocationID}`))?.map((element: string, index: number) => {
                                        return (
                                            <Text as="p" key={`DisplayTextIndex-${index}`} marginBlock="1rem">
                                                {element}
                                            </Text>
                                        )
                                    })
                                }
                            </Flex>
                        }
                        <Flex
                            height={'100vh'}
                            width={'100%'}>
                            <Map lat={props.information?.Latitude} long={props.information?.Longitude} />
                        </Flex>
                    </main>
                </Flex>
            }
        </>
    );
}

export async function getStaticPaths(context: any) {
    let result = await InformationService.getLocations();
    const paths = getPagePaths(context, result, 'LocationID');

    return {
        paths: paths,
        fallback: 'blocking'
    }
}


export async function getStaticProps(context: any) {
    const response = await InformationService.getLocationWithWorkTime(context.params.id);

    const customAds = CustomAdFactory.groupByWidthAndHeight(await cache.fetchCache<CustomAdFull[], CustomAdTypeFull[][]>(RedisKeys.CustomAds, AdService.getAdsByAdTypes, 60 * 60, AdFormatsPerPage['details']));

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['description', 'common', 'footer'])),
            information: response,
            groupedAds: customAds
        },
        revalidate: 60 * 60 * 24,
        notFound: !response
    }
}

export default Details;