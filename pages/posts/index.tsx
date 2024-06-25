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
import NormalAd from "../../components/ad/NormalAd";
import { Flex } from "@chakra-ui/react";
import { CustomAdFactory } from "../../factory/CustomAdFactory";
import cache from "../../lib/cache";
import { CustomAdFull, CustomAdTypeFull } from "../../interfaces/CustomAd";
import { AdFormatsPerPage, RedisKeys } from "../../values/GlobalValues";
import { AdService } from "../../services/AdService";
import useAdManager from "../../hooks/useAdManager";

interface PostsProps {
  posts?: Post[];
  pageInfo: PostPageInfo;
  groupedAds: {[key: string]: CustomAdFull[]};
}

const Posts: NextPage<SSRConfig & PostsProps> = (props) => {
  const { locale } = useRouter();
  const { posts, loadMorePosts, hasNextPage } = usePostData(locale!, [], { hasNextPage: true, endCursor: null });
  const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);
  const { getAd } = useAdManager(props.groupedAds);

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
              let ad = getAd(350, 250);
              return (
                <>
                  <PostElement key={post.title + index} post={post} newLimit={loadMorePosts} isLast={index == posts.length - 1} />
                  <NormalAd key={ad?.CustomAdID} customAd={ad} condition={index % 5 == 0}/>
                </>
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
  
  const customAds = CustomAdFactory.groupByWidthAndHeight(await cache.fetchCache<CustomAdFull[], CustomAdTypeFull[][]>(RedisKeys.CustomAds, AdService.getAdsByAdTypes, 60 * 60, AdFormatsPerPage['blog']));

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
      groupedAds: customAds
    },
    revalidate: 3600
  };
};

export default Posts;