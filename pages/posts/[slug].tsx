import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BlogService } from "../../services/BlogService";
import Post from "../../interfaces/Post";
import Layout from "../../components/shared/Layout";
import ContentContainer from "../../components/shared/ContentContainer";
import { Flex, Heading } from "@chakra-ui/react";
import CategoryContainer from "../../components/category/CategoryContainer";
import PostCategory from "../../components/category/PostCategory";
import Category from "../../interfaces/Category";
import PostImage from "../../components/post/PostImage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig } from "next-i18next";
import SEO from "../../components/SEO";
import { wordpressImageLoader } from "../../lib/imageLoader";

const PostPage: NextPage<SSRConfig & {post?: Post, posts: Post[]}> = ({post, posts, _nextI18Next}) => {

  return (
    <>
    <SEO 
      title={`Blog - ${post?.title}`} 
      description={post?.excerpt} 
      imageUrl={post?.featuredImage.node.sourceUrl} 
      canonicalRelativeRoute={`/posts/${post?.slug}`} 
      imageLoaderFunction={wordpressImageLoader}
    />
      <Layout>
        <ContentContainer>
          <Flex
            mt={'20px'}
            flexDirection={'column'}
          >
            <PostImage 
              post={post}     
              h={{'base': '280px', 'md': '600px', 'lg': '800px'}}
              aspectRatio={'1'}
              linkable={'false'}
            />            
            <CategoryContainer date={post?.date}>
              {
                post?.categories?.edges?.map((category: Category) => {
                  return <PostCategory isSmaller={false} category={category} key={category.node.slug}/>
                })
              }
            </CategoryContainer>
            <Flex
              flexDirection={'column'}
              color={'var(--base-color)'}
              fontFamily={'Poppins'}
              justify={'center'}
            >
              <Heading
                p={2}
                as={'h1'}
                textAlign={'center'}
              >
                {post?.title}
              </Heading>
            </Flex>
            <Flex
              width={'80%'}
              margin={'auto'}
            >
              <Flex 
                dangerouslySetInnerHTML={{__html: post?.content ?? ""}}
                className="wordpress-content-container"
              />
            </Flex>
          </Flex>
        </ContentContainer>
      </Layout>
    </>
  )
};

export const getStaticProps: GetStaticProps = async({
  params,
  locale
}) => {
  const postAndMorePosts = await BlogService.getPost(params?.slug?.toString()!, locale);

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'footer'])),
      post: postAndMorePosts.post?.translation,
      posts: postAndMorePosts.posts
    },
    revalidate: 3600,
    notFound: postAndMorePosts.post == null
  };
};

export const getStaticPaths: GetStaticPaths = async({locales}) => {
  const allPosts = await BlogService.getAllPostSlugs();

  return {
    paths: allPosts.edges.flatMap((edge) => {
      return locales?.map((locale) => {
        return {
          params: {
            slug: edge.node.slug
          },
          locale: locale
        }
      }) ?? [];
     }),
    fallback: 'blocking',
  }
};

export default PostPage;

