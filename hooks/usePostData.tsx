import { useEffect, useState } from "react";
import Post, { PostPageInfo } from "../interfaces/Post";
import { BlogService } from "../services/BlogService";

const usePostData = (locale: string, initialPosts: Post[] | undefined, pageData: PostPageInfo) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts ?? []);
  const [postInfoData, setPostInfoData] = useState<PostPageInfo>(pageData);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    if(!postInfoData.hasNextPage) return;
    setIsLoading(true);
    let result = await BlogService.loadLatestPosts({ lastCursorId: postInfoData.endCursor, locale: locale });
    setPosts((existing) => [ ...existing, ...result.posts ]);
    setPostInfoData(result.pageInfo);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      const initialResult = await BlogService.loadLatestPosts({ lastCursorId: null, locale });
      setPosts(initialResult.posts);
      setPostInfoData(initialResult.pageInfo);
    };

    loadInitialPosts();
  }, [locale]);
  return { loadMorePosts, posts, isLoading, hasNextPage: postInfoData.hasNextPage };
};

export default usePostData;