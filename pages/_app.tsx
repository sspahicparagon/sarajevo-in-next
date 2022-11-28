import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import '../lib/i18n/locales/config.ts';
import Head from 'next/head';
import Toolbar from '../components/Toolbar';
import Router from 'next/router';
import Footer from '../components/Footer';
import { useEffect } from 'react';

declare global {
  interface Window {
    initMap: () => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const loader = document.getElementById('page-splash');
        if (loader)
          loader.style.display = 'none';
      }, 5000);
    }

    Router.events.on('routeChangeComplete', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }, [Router.events]);

  return (
    <>
      <ChakraProvider>
        <Head>
          <title>SarajevoIN</title>
        </Head>
        <Box
          overflowX={'hidden'}
        >
          <Toolbar />
          <Component {...pageProps} />
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default MyApp
