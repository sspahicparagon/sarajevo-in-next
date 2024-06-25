import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import type { GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import SlideshowContainer from '../components/SlideshowContainer'
import style from '../styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TrackImagesService from '../services/TrackImagesService'
import IconPlusText from '../components/IconPlusText'
import { AdFormatsPerPage, CategoryIcons, LogoImage, RedisKeys } from '../values/GlobalValues'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import SEO from '../components/SEO'
import { LanguageHelper } from '../helpers/LanguageHelper'
import CardElement from '../interfaces/CardElement'
import { TranslationType } from '../interfaces/TranslationType'
import NormalAd from '../components/ad/NormalAd'
import { CustomAdFactory } from '../factory/CustomAdFactory'
import cache from '../lib/cache'
import { CustomAdFull, CustomAdTypeFull } from '../interfaces/CustomAd'
import { AdService } from '../services/AdService'
import useAdManager from '../hooks/useAdManager'

interface HomeTypes {
  trackImages: CardElement[];
  groupedAds: { [key: string]: CustomAdFull[] };
}


const Home = ({ trackImages, _nextI18Next, groupedAds }: HomeTypes & SSRConfig) => {
  const { t } = useTranslation<TranslationType>(_nextI18Next?.ns);
  let categories = Object.keys(CategoryIcons);
  const { getAd } = useAdManager(groupedAds);

  const title = "SarajevoIN - " + t("Home-Title");
  return (
    <>
      <Flex
        flexDirection={'column'}
        className={style.container}
      >
        <SEO
          title={title}
          imageUrl={''}
          description={`${t('Home-Description')}\nMail: info@sarajevoin.ba`}
          canonicalRelativeRoute={''}
        />
        <main>
          <section>
            <Flex 
              justify={'center'}
            >
              <NormalAd customAd={getAd(900, 250)} condition={true}/>
            </Flex>
          </section>
          <section>
            <Grid
              className={style['hero-container']}
            >
              <Grid
                className={style['logo-container']}
              >
                <IconPlusText image={LogoImage} interactionEnabled={false} maxHeight={'500px'} maxWidth={'500px'} />
              </Grid>
              <Grid
                className={style['hero-text-container']}
              >
                <Flex
                  flexDirection={'column'}
                  alignItems={{ 'base': 'center', 'md': 'flex-start' }}
                >
                  <Flex
                    id='hero-title'
                    flexDirection={'column'}
                    className={style['hero-title']}
                  >
                    <Heading fontSize={{ 'lg': '4xl', 'md': '2xl', 'base': '2xl' }} as={'h1'} noOfLines={1}>
                      {t("Home-Title")}
                    </Heading>
                  </Flex>
                  <Flex
                    id='hero-text'
                    flexDirection={'column'}
                    height={'100%'}
                    className={style['hero-text']}
                  >
                    <Text textAlign={'justify'}>
                      {t('Home-Description')}
                    </Text>
                  </Flex>
                </Flex>
              </Grid>
            </Grid>
          </section>
          <section>
            <SlideshowContainer array={trackImages} />
          </section>
          <section>
            <Grid
              className={`${style['groupe-icons-container']}`}
            >
              {categories.map((key: string) => {
                return (
                  <Link
                    href={'groupes/' + key}
                    key={key}
                  >
                    <Grid
                      className={`center ${style['groupe-icon-card']}`}
                    >
                      <Flex
                        flexDirection={'column'}
                        width={'100%'}
                        className={'link-interaction center'}
                      >
                        <Flex
                          flexDirection={'column'}
                          className={'center'}
                        >
                          <FontAwesomeIcon icon={CategoryIcons[key]} size={'1x'} />
                        </Flex>
                        <Flex
                          flexDirection={'column'}
                          className={'center'}
                        >
                          <Text textAlign={'center'}>
                            <strong>{t(key)}</strong>
                          </Text>
                        </Flex>
                      </Flex>
                    </Grid>
                  </Link>
                )
              })}
            </Grid>
          </section>
        </main>
      </Flex>
    </>
  )
}

export const getStaticProps:GetStaticProps<HomeTypes> = async (context) => {
  let trackImages = await TrackImagesService.trackImages();

  const customAds = CustomAdFactory.groupByWidthAndHeight(await cache.fetchCache<CustomAdFull[], CustomAdTypeFull[][]>(RedisKeys.CustomAds, AdService.getAdsByAdTypes, 60 * 30, AdFormatsPerPage['home']));

  return {
    props: {
      ...(await serverSideTranslations(LanguageHelper.getLanguageSafe(context.locale), ['common', 'footer'])),
      trackImages: trackImages,
      groupedAds: customAds
    },
    revalidate: 1800
  };
}

export default Home;

