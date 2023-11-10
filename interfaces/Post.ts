import Avatar, { authorFragmentQuery } from "./Author";
import Category, { categoriesQuery } from "./Category";

type Post = {
  author: Avatar;
  categories: {
    edges: Category[];
  };
  content: string;
  date: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  slug: string;
  title: string;
};

type PaginatedPosts = {
  pageInfo: PostPageInfo;
  edges: PostNode[];
};

type PostPageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

type PostNode = {
  node: Post;
}

type PostSlug = {
  node: PostSlugNode;
}

type PostSlugNode = {
  slug: string;
}

const getAllPostSlugsQuery: string = 
  `
  {
    posts(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `;

const postFragmentQuery: string =
  `
  title
  excerpt
  slug
  date
  featuredImage {
    node {
      sourceUrl
    }
  }
  author {
    node {
      ...AuthorFields
    }
  }
  categories {
    ${categoriesQuery}
  }
  `;

const postQueryNoContent: string = 
  `
  post(id: $id, idType: $idType) {
    ...PostFields
  }
  `;

const postQueryContent: string =
  `
  post(id: $id, idType: $idType) {
    translation(language: $locale) {
      ...PostFields
      content
    }
  }
  `;

const postsQuery: string =
  `
  posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
    edges {
      node {
        ...PostFields
      }
    }
  }
  `;

const getPostAndMorePostsQuery: string = 
  `
  fragment AuthorFields on User {
    ${authorFragmentQuery}
  }
  fragment PostFields on Post {
    ${postFragmentQuery}
  }
  query PostBySlug($id: ID!, $idType: PostIdType!) {
    ${postQueryNoContent}
    ${postsQuery}
  }
  `;

const getPostAndMorePostsQueryContent: string = 
`
fragment AuthorFields on User {
  ${authorFragmentQuery}
}
fragment PostFields on Post {
  ${postFragmentQuery}
}
query PostBySlug($id: ID!, $idType: PostIdType!, $locale: LanguageCodeEnum!) {
  ${postQueryContent}
  ${postsQuery}
}
`;

const postPageInfoQuery: string = 
  `
  pageInfo {
    hasNextPage
    endCursor
  }
  `;

const loadLatestPostsQuery: string = 
  `
  fragment AuthorFields on User {
    ${authorFragmentQuery}
  }
  query loadPosts($first: Int!, $after: String, $locale: LanguageCodeFilterEnum) {
    posts(first: $first, after: $after, where: { language: $locale }) {
      ${postPageInfoQuery}
      edges {
        node {
          ${postFragmentQuery}
        }
      }
    }
  }
  `;

const loadLatestsPostsForCategoryQuery = 
  `
  fragment AuthorFields on User {
    ${authorFragmentQuery}
  }
  fragment PostFields on Post {
    ${postFragmentQuery}
  }
  query loadCategoryPosts($first: Int!, $after: String, $categoryName: String, $locale: LanguageCodeFilterEnum) {
    posts(first: $first, after: $after, where: { categoryName: $categoryName, language: $locale }) {
      ${postPageInfoQuery}
      edges {
        node {
          ...PostFields
        }
      }
    }
  } 
  `;

export { getAllPostSlugsQuery, getPostAndMorePostsQuery, loadLatestPostsQuery, getPostAndMorePostsQueryContent, loadLatestsPostsForCategoryQuery };
export type { PostSlug, PostNode, PaginatedPosts, PostPageInfo };
export default Post;