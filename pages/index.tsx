import { Box, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { SSRConfig, useTranslation } from 'next-i18next'
import ChakraCarousel from '../components/ChakraCarousel'
import Header from '../components/Header'
import style from '../styles/Home.module.css'
import Loading from '../components/Loading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import GroupeService from '../services/GroupeService'
import { groupe, location, trackimage } from '@prisma/client'
import TrackImagesService from '../services/TrackImagesService'

function debounce(fn: Function, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  }
};

function determineDisplayItems() {
  if (typeof window === 'undefined') return 6;
  const windowWidth: number = window.innerWidth;

  if (windowWidth <= 600) return 2;
  else if (windowWidth <= 900) return 3;
  else if (windowWidth <= 1200) return 4;
  else if (windowWidth <= 1400) return 5;

  return 6;
};

const Home: NextPage<SSRConfig & { array: (groupe & { location: location[] })[] } & { trackImages: trackimage[] }> = (props) => {
  const [displayItems, setDisplayItems] = useState<number>(determineDisplayItems());
  const { t } = useTranslation('common');
  console.log({ arr: props });
  useEffect(() => {
    const debounceHandleResize = debounce(
      function handleResize() {
        setDisplayItems(determineDisplayItems());
      }, 250);
    window.addEventListener('resize', debounceHandleResize)

    return () => {
      window.removeEventListener('resize', debounceHandleResize)
    }
  }, []);

  return (
    <>
      <Header array={props.trackImages} />
      {props == undefined ?
        <Loading height='calc(100vh - 500px)' />
        :
        <Flex
          flexDirection={'column'}
          className={style.container}
        >
          <>
            {props.array?.map((_) => {
              return (
                <Flex
                  flexDirection={'column'}
                  marginBlock={'1rem'}
                  width={'80%'}
                  key={_.Name}
                >
                  <Box
                    width={'95%'}
                    className={style['slyder-container']}
                  >
                    <>
                      <div className={style['slyder-title']}>{t(_.Name!!)}</div>
                      <ChakraCarousel items={_.location} height={'250px'} displayItems={displayItems} />
                    </>
                  </Box>
                </Flex>
              )
            })}
          </>
        </Flex>
      }
    </>
  )
}

export async function getStaticProps(context: any) {
  let response = await GroupeService.getGroupeWithLocationWithouthCreatedAt();
  response.sort((first: any, second: any) => {
    return second.location.length - first.location.length;
  });
  let trackImages = await TrackImagesService.trackImages();
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      array: response,
      trackImages: trackImages
    }
  };
}

export default Home;

