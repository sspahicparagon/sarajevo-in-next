import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BlogService } from "../../services/BlogService";
import { Text } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig } from "next-i18next";
import Layout from "../../components/shared/Layout";
import ContentContainer from "../../components/shared/ContentContainer";
import HeroPost from "../../components/post/HeroPost";
import PostGrid from "../../components/post/PostGrid";
import PostElement from "../../components/post/PostElement";
import usePostDataCategory from "../../hooks/usePostDataCategory";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PostsEnd from "../../components/post/PostsEnd";
import SEO from "../../components/SEO";
import PageTitle from "../../components/PageTitle";

const Categories: NextPage<SSRConfig & { categoryName: string }> = (props) => {
  const router = useRouter();
  let realCategory = props.categoryName;
  const array = props.categoryName?.split('-');
  if(array != undefined) {
    if(array[array.length - 1] == 'en' || array[array.length - 1] == 'de' || array[array.length - 1] == 'bs')
        array.pop();

    array.push(router.locale!);
  }
  realCategory = array?.join('-');

  useEffect(() => {
    router.push({
      'pathname': '/post-categories/[slug]',
      query: {
        realCategory
      }
    }, `/post-categories/${realCategory}`, { shallow: true });
  }, [router.locale]);

  const { posts, loadMorePosts, hasNextPage } = usePostDataCategory(realCategory, router.locale!);

  return (
    <>
      <SEO
        title={'SarajevoIN Blog Categories'}
        description={''}
        canonicalRelativeRoute={`/post-categories/${realCategory}`}
      />
      <PageTitle title={'Blog'} />
      <Layout>
        <ContentContainer>
          <HeroPost post={posts[0]} />
          <PostGrid>
            {
              posts.map((post, index) => {
                if(index == 0) return null;
                return (
                  <PostElement key={post.slug + index} post={post} newLimit={hasNextPage ? loadMorePosts : () => {}} isLast={index == posts.length - 1} />
                )
              })
            }
          </PostGrid>
          <PostsEnd hasMorePosts={hasNextPage} />
        </ContentContainer>
      </Layout>
    </>
  )
};

export const getStaticPaths: GetStaticPaths = async() => {
  const allCategories = await BlogService.getAllCategorySlugs();

  return {
    paths: allCategories.edges.map((edge) => `/post-categories/${edge.node.slug}`) || [],
    fallback: 'blocking',
  }
};

export const getStaticProps: GetStaticProps = async(context: any) => {
  const categorySlug: string = context.params.slug;
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
      categoryName: categorySlug
    },
    revalidate: 3600
  };
};

export default Categories;