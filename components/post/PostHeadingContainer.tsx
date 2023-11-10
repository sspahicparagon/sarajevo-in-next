import { Flex } from "@chakra-ui/react"

const PostHeadingContainer = ({children}: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <Flex
      flexDirection={'column'}
      color={'var(--base-color)'}
      fontFamily={'Poppins'}
      justify={'center'}
    >
      {children}
    </Flex>
  );
};

export default PostHeadingContainer;