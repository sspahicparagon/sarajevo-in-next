import Page, { PageNode, getPageByDatabaseId } from "../interfaces/BlogPage";
import { CategorySlug, getAllCategorySlugsQuery } from "../interfaces/Category";
import Post, { PaginatedPosts, PostNode, PostSlug, getAllPostSlugsQuery, getPostAndMorePostsQuery, getPostAndMorePostsQueryContent, loadLatestPostsQuery, loadLatestsPostsForCategoryQuery } from "../interfaces/Post";

const API_URL = "https://blog.sarajevoin.ba/wp/api";

const BlogServiceFunction = () => {
  const fetchWordpressAPI = async <T, T2>(query = '', { variables = {} as T2 }: Record<string,T2>): Promise<T> => {
    const headers = { 'Content-Type': 'application/json' };
    const response: Response = await fetch(API_URL, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
        variables
      })
    });
    const json: { errors: any, data: T } = await response.json();

    if(json.errors) {
      console.error(json.errors);
      throw new Error('Error occured');
    };

    return json.data;
  };

  const getAllPostSlugs = async () => {
    const data = await fetchWordpressAPI<{ posts: { edges: PostSlug[] }}, {}>(getAllPostSlugsQuery, {});
    return data.posts;
  };

  const getAllCategorySlugs = async () => {
    const data = await fetchWordpressAPI<{ categories: { edges: CategorySlug[] } }, {}>(getAllCategorySlugsQuery, {});
    return data.categories;
  }

  const getPostAndMorePosts = async (slug: string) => {
    const data = await fetchWordpressAPI<
      { 
        post: Post, 
        posts: { 
          edges: PostNode[]
        } 
      }, 
      { 
        id: string, 
        idType: string 
      }
    >(getPostAndMorePostsQuery, { variables: { id: slug, idType: 'SLUG' } });

    data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);

    if(data.posts.edges.length > 2) data.posts.edges.pop();
    
    let resultingPosts = data.posts.edges.map((edge) => edge.node);
    return { post: data.post, posts: resultingPosts };
  };

  const getPost = async(slug: string, locale: string | undefined) => {
    const data = await fetchWordpressAPI<
    { 

      post: {
        translation: Post
      }, 
      posts: { 
        edges: PostNode[]
      } 
    }, 
    { 
      id: string, 
      idType: string,
      locale: string | undefined
    }
    >(getPostAndMorePostsQueryContent, { variables: { id: slug, idType: 'SLUG', locale: locale?.toUpperCase() } });

    data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);

    if(data.posts.edges.length > 2) data.posts.edges.pop();
    
    let resultingPosts = data.posts.edges.map((edge) => edge.node);
    return { post: data.post, posts: resultingPosts };
  };

  const getPageById = async(id: number) => {
    const data = await fetchWordpressAPI<
    {
      page: PageNode
    },
    {
      id: string | null
    }
    >(getPageByDatabaseId, { variables: { id: id.toString() } });

    return { page: data.page };
  }

  const loadLatestPosts = async (params: {lastCursorId: string | null, locale: string | null}) => {
    const data = await fetchWordpressAPI<
      {
        posts: PaginatedPosts
      },
      {
        after: string | null,
        first: number,
        locale: string | null | undefined
      }
    >(loadLatestPostsQuery, { variables: { after: params.lastCursorId, first: 7, locale: params.locale?.toUpperCase() } });

    let resultingPosts = data.posts.edges.map((edge) => edge.node);
    return { pageInfo: data.posts.pageInfo, posts: resultingPosts };
  };

  const loadLatestPostsForCategory = async (params: {lastCursorId: string | null, categoryName: string | null, locale: string | null}) => {
    const data = await fetchWordpressAPI<
      {
        posts: PaginatedPosts
      },
      {
        after: string | null,
        first: number,
        categoryName: string | null,
        locale: string | null
      }
    >(loadLatestsPostsForCategoryQuery, { variables: { after: params.lastCursorId, first: 7, categoryName: params.categoryName, locale: params.locale?.toUpperCase()! } });

    let resultingPosts = data.posts.edges.map((edge) => edge.node);
    return { pageInfo: data.posts.pageInfo, posts: resultingPosts };
  };

  return {
    fetchWordpressAPI,
    getAllPostSlugs,
    getPostAndMorePosts,
    loadLatestPosts,
    getPost,
    loadLatestPostsForCategory,
    getAllCategorySlugs,
    getPageById
  };


};

export const BlogService = BlogServiceFunction();