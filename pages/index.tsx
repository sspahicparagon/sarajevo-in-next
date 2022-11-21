import { Box, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ChakraCarousel from '../components/ChakraCarousel'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Groupe from '../interfaces/Groupe'
import GroupService from '../services/GroupeService'
import style from '../styles/Home.module.css'
import { withTranslation } from 'react-i18next';

interface HomeConfig {
  groupes?: Groupe[];
}

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

const Home: NextPage = () => {
  const [array, setArray] = useState<Groupe[]>([]);
  const [displayItems, setDisplayItems] = useState<number>(determineDisplayItems());
  const { t } = useTranslation();

  useEffect(() => {
    const debounceHandleResize = debounce(
      function handleResize() {
        setDisplayItems(determineDisplayItems());
      }, 250);
    GroupService.getGroupes().then(data => {
      setArray(data);
    })
    window.addEventListener('resize', debounceHandleResize)

    return () => {
      window.removeEventListener('resize', debounceHandleResize)
    }
  }, []);

  return (
    <>
      <Header />
      <Flex
        flexDirection={'column'}
        className={style.container}
      >
        <>
          {array?.map((_) => {
            return (
              <Flex
                flexDirection={'column'}
                marginBlock={'3rem'}
                width={'80%'}
                key={_.Name}
              >
                <Box
                  width={'95%'}
                  className={style['slyder-container']}
                >
                  <>
                    <div className={style['slyder-title']}>{t(_.Name!!)}</div>
                    <ChakraCarousel items={_.location} height={'300px'} displayItems={displayItems} />
                  </>
                </Box>
              </Flex>
            )
          })}
        </>
      </Flex>
      <Footer />
    </>
  )
}

export default withTranslation()(Home);

