import { NextPage } from "next";
import { SSRConfig } from "next-i18next";
import Layout from "../../../components/shared/Layout";
import { Flex, Heading, Text } from "@chakra-ui/react";
import SEO from "../../../components/SEO";
import ContentContainer from "../../../components/shared/ContentContainer";
import ChakraNextLink from "../../../components/ChakraNextLink";

const SuccessSubmitedForm: NextPage<SSRConfig> = (props) => {
  return (
    <>
    <Layout backgroundImage="public/images/track-images/track-image-8.webp">
      <ContentContainer>
        <Flex
          flexDirection={'column'}
          justify={'center'}
          align={'center'}
          mt={'5rem'}
          fontFamily={'Poppins'}
          background={'white'}
          borderRadius={999}
        >
          <Heading as={'h1'}>Hvala na Vašoj poruci!</Heading>
          <Text>Vaša poruka je proslijeđena SarajevoIN timu. Javimo Vam se ubrzo!</Text>
          <Text>Ovdje se možete vratiti na <ChakraNextLink href="/" color={'var(--indicator-color)'}>početnu</ChakraNextLink> stranicu.</Text>
        </Flex>
      </ContentContainer>
    </Layout>
    </>
  );
};

export default SuccessSubmitedForm;