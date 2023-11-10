import { Flex, Text } from "@chakra-ui/react";
import Post from "../../interfaces/Post";

const PostExcerpt = ({post}: { post?: Post }) => {
  return (
    <Flex
      flexDirection={'column'}
      width={{'base': '100%', 'md': '95%'}}
      justify={'center'}
      margin={'auto'}
      p={2}
    >
      <Text 
        dangerouslySetInnerHTML={{ __html: post?.excerpt ?? "" }} 
        textAlign={'justify'}
        fontSize={{'base': '0.7rem', 'md': '0.8rem', 'lg': '1rem'}}
      />
    </Flex>
  )
};

export default PostExcerpt;