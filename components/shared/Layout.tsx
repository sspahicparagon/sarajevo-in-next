import { Flex } from "@chakra-ui/react";
import { ImageStorage } from "../../values/GlobalValues";

type LayoutProps = {
  color?: string;
  children: JSX.Element[] | JSX.Element;
  backgroundImage?: string;
}

const Layout = ({ children, color = 'var(--color-gray)', backgroundImage = '' }: LayoutProps) => {

  let backgroundProps: any = {
    backgroundImage: `${ImageStorage}/${backgroundImage}`,
    backgroundPosition:'center',
    backgroundSize:'cover'
  };

  if(backgroundImage == '') backgroundProps = {};

  return (
    <>
      <Flex
        minH={'100vh'}
        justify={'center'}
        backgroundColor={color}
        {...backgroundProps}
      >
        <main>
          {children}
        </main>
      </Flex>
    </>
  )
};

export default Layout;