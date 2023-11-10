type Category = {
  node: CategoryNode;
};

type CategoryNode = {
  name: string;
  slug: string;
};

type CategorySlug = {
  node: CategorySlugNode;
}

type CategorySlugNode = {
  slug: string;
}

const categoriesQuery: string = 
  `
  edges {
    node {
      name
      slug
    }
  }
  `;

const getAllCategorySlugsQuery: string = 
  `
  {
    categories(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `;

export { categoriesQuery, getAllCategorySlugsQuery };
export type { CategorySlug, CategorySlugNode }
export default Category;
