import { Flex } from '@chakra-ui/react'

const ContentContainer = ({ children }: { children: JSX.Element[] | JSX.Element | null | undefined | false }) => {
  return (
    <Flex 
      flexDirection={'column'}
      maxW={'2000px'}
      margin={'auto'}
    >
      {children}
    </Flex>
  );
};

export default ContentContainer;