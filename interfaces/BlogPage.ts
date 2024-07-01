type Page = {
  page: PageNode;
};

type PageNode = {
  content: string;
  featuredImageId: string;
  featuredImage: FeaturedImage;
  link: string;
  pageId: number;
  slug: string;
  title: string;
  uri: string;
  aioseoMetaDescription: string;
};

type FeaturedImage = {
  node: FeaturedImageNode;
};

type FeaturedImageNode = {
  altText: string;
  desiredSlug: string;
  id: string;
  link: string;
  mediaItemUrl: string;
  slug: string;
  sourceUrl: string;
  uri: string;
};

const getPageByDatabaseId: string = `
query PageByDatabaseId($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    content(format: RENDERED)
    featuredImageId
    featuredImage {
      node {
        altText
        desiredSlug
        id
        link
        mediaItemUrl
        slug
        sourceUrl
        uri
      }
    }
    link
    pageId
    slug
    title
    uri
    aioseoMetaDescription
  }
}
`;

export { getPageByDatabaseId };
export type { FeaturedImage, FeaturedImageNode, PageNode };
export default Page;