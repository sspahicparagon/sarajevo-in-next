import Head from "next/head";
import { useRouter } from "next/router";
import imageLoader from "../lib/imageLoader";

interface SEOProps {
  canonicalRelativeRoute: string;
  title: string | undefined | null, 
  description: string | undefined | null, 
  imageUrl:  string | undefined | null
}

const SEO = ({ canonicalRelativeRoute, title = '', description = '', imageUrl = '' }: SEOProps) => {

  if(!canonicalRelativeRoute.startsWith('/'))
    canonicalRelativeRoute = '/' + canonicalRelativeRoute;

  if(!title || title == '') title = "SarajevoIN Page";
  if(!description || description == '') description = "SarajevoIN";
  if(!imageUrl || imageUrl == '') imageUrl = `${process.env.BASE_URL}/sarajevo.in-logo-removebg (1).png`;
  else imageUrl = imageLoader({src: imageUrl});

  const { locale } = useRouter();
  const supportedLanguages = [{ lang: 'x-default', canonical: true }, { lang: 'bs', canonical: false }, { lang: 'de', canonical: false }]

  return (
    <Head>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={'SarajevoIN Image'} />
      <meta property="og:locale" content={locale} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:site_name" content={'SarajevoIN'} />
      <meta charSet="utf-8"/>
      {
        supportedLanguages.map(languageObj => {
          let url: string = `${process.env.BASE_URL}${languageObj.canonical ? "" : `/${languageObj.lang}`}${canonicalRelativeRoute}`;
          return (
            <link rel={languageObj.canonical ? 'canonical' : 'alternate'} href={url} hrefLang={languageObj.lang} key={languageObj.lang} />
          )
        })
      }
      <title>{title}</title>
    </Head>
  )
};

export default SEO;