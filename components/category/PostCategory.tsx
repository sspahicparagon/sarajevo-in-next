import { Flex } from "@chakra-ui/react";
import Category from "../../interfaces/Category";
import ChakraNextLink from "../ChakraNextLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const PostCategory = ({ category, isSmaller = false }: { category: Category, isSmaller: boolean }) => {
  return (
    <>
      <Flex
      background={'transparent'}
      color={'var(--indicator-color)'}
      cursor={'pointer'}
      justify={'center'}
      align={'center'}
      fontSize={ !isSmaller ?
        {'base': '0.6rem', 'md': '1rem', 'lg': '1.1rem'}
        : { 'base': '0.6rem', 'md': '0.7rem', 'lg': '0.8rem' }}
      fontFamily={'Poppins'}
      fontWeight={{'base': 'semibold', 'md': 'normal'}}
      >
        <ChakraNextLink 
          href={`/post-categories/${category.node.slug}`}
          position={'relative'}
          display={'inline-flex'}
          paddingInline={'5px'}
        >
          {category.node.name}
          <FontAwesomeIcon 
            style={{
              'position': 'absolute',
              left: 'calc(100% - 5px)'
            }} 
            size={'2xs'} 
            icon={faArrowUpRightFromSquare}
          />
        </ChakraNextLink>
      </Flex>
    </>
  );
};

export default PostCategory;