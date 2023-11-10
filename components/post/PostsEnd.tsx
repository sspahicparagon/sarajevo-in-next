import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next";
import { TranslationType } from "../../interfaces/TranslationType";

const PostsEnd = ({hasMorePosts}: { hasMorePosts: boolean }) => {
  const { t } = useTranslation<TranslationType>('common');

  return (
    <>
      { !hasMorePosts ?
        <Flex
          justify={'center'}
          paddingBlock={'1rem'}
        >
          <Text 
            fontSize={'2xl'} 
            fontFamily={'Poppins'} 
            color={'var(--base-color)'}
          >
            {t('no-more-posts')}
          </Text>
        </Flex>
        :
        <Flex
          justify={'center'}
          marginTop={'2rem'}
          marginBottom={'1rem'}
        >
          <Spinner size='xl' color={'var(--base-color)'}/>
        </Flex>
      }
    </>
  );
};

export default PostsEnd;