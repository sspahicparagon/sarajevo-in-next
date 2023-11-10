import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig, useTranslation } from "next-i18next";
import usePostData from "../../hooks/usePostData";
import Layout from "../../components/shared/Layout";
import ContentContainer from "../../components/shared/ContentContainer";
import HeroPost from "../../components/post/HeroPost";
import PostGrid from "../../components/post/PostGrid";
import PostElement from "../../components/post/PostElement";
import { useRouter } from "next/router";
import Post, { PostPageInfo } from "../../interfaces/Post";
import { TranslationType } from "../../interfaces/TranslationType";
import PostsEnd from "../../components/post/PostsEnd";
import SEO from "../../components/SEO";
import PageTitle from "../../components/PageTitle";

const Posts: NextPage<SSRConfig & { posts?: Post[] } & { pageInfo: PostPageInfo }> = (props) => {
  const { locale } = useRouter();
  const { posts, loadMorePosts, hasNextPage } = usePostData(locale!, [], { hasNextPage: true, endCursor: null });
  const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);

  return (
    <>
    <PageTitle title={'Blog'} />
    <Layout>
      <SEO
        title={'SarajevoIN Blog'}
        description={t('Blog-Description')}
        canonicalRelativeRoute={'/posts'}
      />
      <ContentContainer>
        <HeroPost post={posts[0]} />
        <PostGrid>
          {
            posts.map((post, index) => {
              if(index == 0) return null;
              return (
                <PostElement key={post.title + index} post={post} newLimit={loadMorePosts} isLast={index == posts.length - 1} />
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

export const getStaticProps: GetStaticProps = async(context: any) => {

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'footer']))
    },
    revalidate: 3600
  };
};

export default Posts;