import { Flex } from "@chakra-ui/react";

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {

  return (
    <>
      <Flex
        minH={'100vh'}
        justify={'center'}
        backgroundColor={'var(--color-gray)'}
      >
        <main>
          {children}
        </main>
      </Flex>
    </>
  )
};

export default Layout;