import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import Toolbar from '../components/Toolbar';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import { useEffect, useRef } from 'react';
import { appWithTranslation } from 'next-i18next'
import { gaPageView } from '../lib/pageRouter';
import '../styles/Calendar.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';

declare global {
  interface Window {
    initMap: () => void;
  }
}

function MyApp({ Component, pageProps, session }: AppProps & { session: Session }) {
  config.autoAddCss = false;
  let router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if(!url.includes('admin'))
        gaPageView(url, document.title);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const loader = document.getElementById('page-splash');
        if (loader)
          loader.style.display = 'none';
      }, 2000);
    }

    router.events.on('routeChangeComplete', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }, [router.events]);

  return (
    <>
    <SessionProvider session={session}>
      <ChakraProvider>
        <Box
          overflowX={'hidden'}
        >
          <Toolbar />
          <Component {...pageProps} />
          <Footer />
        </Box>
      </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default appWithTranslation(MyApp)
