import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import SlideshowContainer from '../components/SlideshowContainer'
import style from '../styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import GroupeService from '../services/GroupeService'
import { location, trackimage } from '@prisma/client'
import TrackImagesService from '../services/TrackImagesService'
import Head from 'next/head'
import IconPlusText from '../components/IconPlusText'
import { CategoryIcons, LogoImage } from '../values/GlobalValues'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const Home: NextPage<SSRConfig & { array: { [category: string]: location[] } } & { trackImages: trackimage[] }> = (props) => {
  const { t } = useTranslation(props._nextI18Next?.ns);
  let categories = CategoryIcons;

  return (
    <>
      <Flex
        flexDirection={'column'}
        className={style.container}
      >
        <Head>
          <meta property='og:image' content={`${process.env.BASE_URL}/sarajevo.in-logo-removebg (1).png`} />
          <meta property='og:description' content={`${t('Home-Description')}\nMail: info@sarajevoin.ba`} />
        </Head>
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
                      Sarajevo na jednom mjestu
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
            <SlideshowContainer array={props.trackImages} />
          </section>
          <section>
            <Grid
              className={`${style['groupe-icons-container']}`}
            >
              {categories.map((list: { item: (string | any)[] }) => {
                return (
                  <Link
                    href={'groupes/' + list.item[0]}
                    key={list.item[0]}
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
                          <FontAwesomeIcon icon={list.item[1]} size={'1x'} />
                        </Flex>
                        <Flex
                          flexDirection={'column'}
                          className={'center'}
                        >
                          <Text textAlign={'center'}>
                            <strong>{t(list.item[0])}</strong>
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

export async function getStaticProps(context: any) {
  let response = await GroupeService.getGroupesWithLocationAsDictionary();
  let trackImages = await TrackImagesService.trackImages();
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
      revalidate: 3600,
      array: response,
      trackImages: trackImages
    }
  };
}

export default Home;

