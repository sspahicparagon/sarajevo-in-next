import Post from "../../interfaces/Post";
import { Flex, Heading } from "@chakra-ui/react";
import Category from "../../interfaces/Category";
import CategoryContainer from "../category/CategoryContainer";
import PostCategory from "../category/PostCategory";
import PostHeadingContainer from "./PostHeadingContainer";
import PostHeading from "./PostHeading";
import PostExcerpt from "./PostExcerpt";
import PostLink from "./PostLink";
import PostImage from "./PostImage";
import { useTranslation } from "next-i18next";
import { TranslationType } from "../../interfaces/TranslationType";

interface HeroPostProps {
  post?: Post;
}
const HeroPost = ({ post }: HeroPostProps) => {
  const { t } = useTranslation<TranslationType>('common')
  return (
    <>
      <Flex
        mt={'20px'}
        marginInline={'auto'}
        flexDirection={'column'}
      >
        <Heading
          color={'var(--base-color)'}
          textAlign={'start'}
          fontSize={{'base': '1.1rem', 'md': '1.5rem', 'lg': '1.7rem'}}
          p={2}
          borderBottom={'4px solid var(--indicator-color)'}
          mb={4}
          fontFamily={'Poppins'}
        >
          {t('latest-post')}
        </Heading>
        <PostImage 
          post={post}     
          h={{'base': '200px', 'md': '600px', 'lg': '1000px'}}
          aspectRatio={'1'}
          linkable={'true'}
        />
        <CategoryContainer date={post?.date}>
          {
            post?.categories?.edges?.map((category: Category) => {
              return <PostCategory isSmaller={false} category={category} key={post.title + category.node.slug}/>
            })
          }
        </CategoryContainer>
        <PostLink
          post={post}
        >
          <PostHeadingContainer>
            <PostHeading post={post} />
            <PostExcerpt post={post} />
          </PostHeadingContainer>
        </PostLink>
      </Flex>
    </> 
  )
};

export default HeroPost;