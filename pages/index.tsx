import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { SSRConfig, UserConfig, useTranslation } from 'next-i18next'
import SlideshowContainer from '../components/SlideshowContainer'
import style from '../styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TrackImagesService from '../services/TrackImagesService'
import IconPlusText from '../components/IconPlusText'
import { CategoryIcons, LogoImage } from '../values/GlobalValues'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import SEO from '../components/SEO'
import { LanguageHelper } from '../helpers/LanguageHelper'
import CardElement from '../interfaces/CardElement'
import { TranslationType } from '../interfaces/TranslationType'

interface HomeTypes {
  trackImages: CardElement[];
}

const Home = ({ trackImages, _nextI18Next  }: HomeTypes & SSRConfig) => {
  const { t } = useTranslation<TranslationType>(_nextI18Next?.ns);
  let categories = Object.keys(CategoryIcons);

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

  return {
    props: {
      ...(await serverSideTranslations(LanguageHelper.getLanguageSafe(context.locale), ['common', 'footer'])),
      revalidate: 3600,
      trackImages: trackImages
    }
  };
}

export default Home;

