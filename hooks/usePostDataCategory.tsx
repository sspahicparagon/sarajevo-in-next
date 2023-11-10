import { useEffect, useState } from "react";
import Post, { PostPageInfo } from "../interfaces/Post";
import { BlogService } from "../services/BlogService";

const usePostDataCategory = (categoryName: string, locale: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postInfoData, setPostInfoData] = useState<PostPageInfo>({ hasNextPage: true, endCursor: null });
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    if(!postInfoData.hasNextPage) return;
    setIsLoading(true);
    let result = await BlogService.loadLatestPostsForCategory({ lastCursorId: postInfoData.endCursor, categoryName, locale });
    setPosts((existing) => [ ...existing, ...result.posts ]);
    setPostInfoData(result.pageInfo);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      const initialResult = await BlogService.loadLatestPostsForCategory({ lastCursorId: null, categoryName, locale })
      setPosts(initialResult.posts);
      setPostInfoData(initialResult.pageInfo);
    };

    loadInitialPosts();
  }, [locale, categoryName]);
  return { loadMorePosts, posts, isLoading, hasNextPage: postInfoData.hasNextPage };
};

export default usePostDataCategory;