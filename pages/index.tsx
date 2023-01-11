import { Flex, Heading, Text } from '@chakra-ui/react'
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
import useDisplayItemsCount from '../hooks/useDisplayItemsCount'
import { CategoryIcons, LogoImage } from '../values/GlobalValues'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import useReduceToDictionary from '../hooks/useReduceToDictionary'

const Home: NextPage<SSRConfig & { array: { [category: string]: location[] } } & { trackImages: trackimage[] }> = (props) => {
  const displayItemsCount = useDisplayItemsCount();
  const { t } = useTranslation(props._nextI18Next?.ns);
  let categories = useReduceToDictionary(CategoryIcons, displayItemsCount);

  return (
    <>
      <Flex
        flexDirection={'column'}
        className={style.container}
      >
        <Head>
          <meta property='og:image' content={`${process.env.BASE_URL}/sarajevo.in-logo-removebg (1).png`} />
          <meta property='og:description' content={'Mail: info@sarajevoin.ba'} />
        </Head>
        <main>
          <section>
            <Flex
              flexDirection={displayItemsCount <= 4 ? 'column' : 'row'}
              className={style['hero-container']}
            >
              <Flex
                flexDirection={'column'}
                alignItems={'flex-end'}
                className={style['logo-container']}
              >
                <IconPlusText image={LogoImage} interactionEnabled={false} maxHeight={'500px'} maxWidth={'500px'} />
              </Flex>
              <Flex
                flexDirection={'column'}
                width={displayItemsCount > 4 ? '40%' : '100%'}
              >
                <Flex
                  flexDirection={'column'}
                  alignItems={displayItemsCount <= 4 ? 'center' : 'flex-start'}
                >
                  <Flex
                    id='hero-title'
                    flexDirection={'column'}
                    className={style['hero-title']}
                  >
                    <Heading fontSize={displayItemsCount > 4 ? '4xl' : '2xl'} as={'h1'} noOfLines={1}>
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
                      SarajevoIN je stranica koji se bavi promovisanjem grada Sarajeva. Na stranici se mogu vidjeti slike i video sadržaji sa različitih lokacija u Sarajevu,
                      kao i informacije o zanimljivim mjestima za posjetu i događajima u gradu. SarajevoIN se fokusira na promovisanje turističkih atrakcija i znamenitosti u Sarajevu.
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </section>
          <section>
            <SlideshowContainer array={props.trackImages} />
          </section>
          <section>
            <Flex
              flexDirection={'column'}
              alignItems={'center'}
            >
              {categories.map((list: any[]) => {
                return (
                  <Flex
                    flexDirection={'row'}
                    width={'100%'}
                    key={`${Math.random()}`}
                    className={`center ${style['groupe-icons-container']}`}
                  >
                    {
                      list.map((item: any) => {
                        return (
                          <Link href={'groupes/' + item[0]} key={item[0]}>
                            <Flex
                              flexDirection={'column'}
                              width={`${Math.floor(100 / displayItemsCount)}%`}
                              height={'var(--icon-container-height)'}
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
                                  <FontAwesomeIcon icon={item[1]} size={'1x'} />
                                </Flex>
                                <Flex
                                  flexDirection={'column'}
                                  className={'center'}
                                >
                                  <Text>
                                    <strong>{t(item[0])}</strong>
                                  </Text>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Link>
                        )
                      })
                    }
                  </Flex>
                )
              })}
            </Flex>
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

