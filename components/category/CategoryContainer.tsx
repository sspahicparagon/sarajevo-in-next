import { Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { convertStringToPrettyDate } from "../../helpers/DateHelper";

const CategoryContainer = ({ children, date }: { children: JSX.Element[] | JSX.Element | undefined, date?: string }) => {
  const { locale } = useRouter();
  return (
    <>
      <Text
        fontFamily={'Poppins'}
        fontSize={{ 'base': '0.6rem', 'md': '0.7rem', 'lg': '0.8rem' }}
        p={2}
        color={'var(--base-color)'}
      >
        {convertStringToPrettyDate(date ?? "", locale!)}
      </Text>
      <Flex
        gap={3}
        justify={'flex-start'}
        flexWrap={'wrap'}
        p={2}
      >
        {children}
      </Flex>
    </>
  )
};

export default CategoryContainer;