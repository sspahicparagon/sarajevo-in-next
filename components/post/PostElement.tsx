import { Box, Flex, GridItem, Heading } from "@chakra-ui/react";
import Post from "../../interfaces/Post";
import Image from 'next/image';
import PostHeading from "./PostHeading";
import CategoryContainer from "../category/CategoryContainer";
import PostCategory from "../category/PostCategory";
import Category from "../../interfaces/Category";
import PostLink from "./PostLink";
import PostImage from "./PostImage";
import { useEffect, useRef } from "react";

const PostElement = ({ post, newLimit, isLast }: { post: Post, newLimit: () => void, isLast: boolean }) => {

  const postRef = useRef(null);

  useEffect(() => {
    if(!postRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if(isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(postRef.current);
  }, [isLast]);

  return (
    <>
      <Box
        gap={1}
        ref={postRef}
      >
        <PostImage
          post={post}
          h={{'base': '200px', 'md': '270px', 'xl': '280px', '2xl': '260px'}}
          borderRadius={'15px'}
          overflow={'hidden'}
          aspectRatio={'4/3'}
          linkable={'true'}
        />
        <Box
          maxW={{'base': '270px', 'md': '350px', 'xl': '370px', '2xl': '340px'}}
        >
          <CategoryContainer date={post.date}>
          {
            post.categories.edges.map((category: Category) => {
              return <PostCategory isSmaller={true} category={category} key={post.title + category.node.slug}/>
            })
          }
          </CategoryContainer>
          <PostLink post={post}>
            <Flex>
              <Heading 
                as={'h3'}
                fontSize={{'base': '0.8rem', 'md': '0.9rem', 'lg': '1.1rem'}}
                p={2}
                fontFamily={'Poppins'}
              >
                {post.title}
              </Heading>
            </Flex>
          </PostLink>
        </Box>
      </Box>
    </>
  );
};

export default PostElement;