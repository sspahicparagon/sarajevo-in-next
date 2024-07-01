import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BlogService } from "../../../services/BlogService";
import { PageNode } from "../../../interfaces/BlogPage";
import PageTitle from "../../../components/PageTitle";
import Layout from "../../../components/shared/Layout";
import ContentContainer from "../../../components/shared/ContentContainer";
import SEO from "../../../components/SEO";
import { wordpressImageLoader } from "../../../lib/imageLoader";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { TranslationType } from "../../../interfaces/TranslationType";
import ChakraNextLink from "../../../components/ChakraNextLink";

const EventOrganizer: NextPage<SSRConfig & { page: PageNode }> = ({ page, _nextI18Next }) => {
  const { t } = useTranslation<TranslationType>(_nextI18Next?.ns);

  return (
    <>
      <PageTitle title={page.title} />
      <Layout color="white">
        <Flex
          justify={'center'}
          align={'center'}
          color={'var(--color-gray)'}
          backgroundColor={'var(--base-color)'}
          borderRadius={'0px 0px 15px 15px'}
          padding={'.5rem'}
          textAlign={'center'}
        >
          <Heading 
            as='h3'           
            fontSize={'1rem'}
            fontFamily={'Poppins'}
          >
            {t('Service-Only-BH')}
          </Heading>
        </Flex>
        <SEO 
          title={page.title}
          description={page.aioseoMetaDescription}
          canonicalRelativeRoute={'/service/event-organizer'}
          imageLoaderFunction={wordpressImageLoader}
          imageUrl={page.featuredImage?.node?.mediaItemUrl}
          
        />
        <ContentContainer>
          <Flex 
            dangerouslySetInnerHTML={{ __html: page.content ?? "" }}
            flexDirection={'column'}
            fontFamily={'Poppins'}
          >
          </Flex>
        </ContentContainer>
        <Flex
          justify={'center'}
          align={'center'}
          textAlign={'center'}
        >
          <Text
            fontFamily={'Poppins'}
          >
            <ChakraNextLink href="https://www.vecteezy.com/free-vector/nature">Nature Vectors by Vecteezy</ChakraNextLink>
            <br />
            <ChakraNextLink href={"https://www.vecteezy.com/members/djvstockpro"}>Djvstockpro image author</ChakraNextLink>
          </Text>
        </Flex>
      </Layout>
    </>
  )
};

export const getStaticProps: GetStaticProps = async({ locale = 'en' }: GetStaticPropsContext) => {
  
  const pageData = await BlogService.getPageById(315);

  pageData.page.content = pageData.page.content.replace('/wp/api#wpcf7-f341-o1', '/api/form/event-organizer');
  return {
    props: {
      ... (await serverSideTranslations(locale, ['common', 'footer'])),
      page: pageData.page
    },
    revalidate: 60 * 60 * 24
  }
};

export default EventOrganizer;