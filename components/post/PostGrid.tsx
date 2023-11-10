import { Grid, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { TranslationType } from "../../interfaces/TranslationType";

const PostGrid = ({children}: { children: JSX.Element[] | JSX.Element | (JSX.Element | null)[]  }) => {
  const { t } = useTranslation<TranslationType>('common');
  return (
    <>
      <Heading
        color={'var(--base-color)'}
        fontSize={{'base': '1.1rem', 'md': '1.5rem', 'lg': '1.7rem'}}
        as={'h2'}
        marginBlock={4}
        p={2}
        borderBottom={'4px solid var(--indicator-color)'}
        fontFamily={'Poppins'}
      >
        {t('more-posts')}
      </Heading>
      <Grid
        justifyItems={'center'}
        display={'grid'}
        gridGap={'2rem'}
        gridTemplateColumns={{'base': 'repeat(1, minmax(250px, 2fr))', 'md': 'repeat(2, minmax(350px, 2fr))', 'xl': 'repeat(3, minmax(350px, 2fr))', '2xl': 'repeat(4, minmax(300px, 1fr))'}}
      >
          {children}
      </Grid>
    </>
  )
};

export default PostGrid;