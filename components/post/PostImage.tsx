import { Flex, FlexProps } from "@chakra-ui/react";
import Post from "../../interfaces/Post";
import Image from 'next/image';
import PostLink from "./PostLink";
import { wordpressImageLoader } from "../../lib/imageLoader";

const PostImage = (props: FlexProps & { post?: Post } & { linkable: string }) => {
  const image = props.post?.featuredImage?.node?.sourceUrl ?? "https://enhancedesthetics.ca/wp-content/uploads/2023/02/wc-placeholder.png";
  return (
    <>
    { props.linkable &&
      <PostLink post={props.post} >
        <Flex
          position={'relative'}
          {...props}
          margin={'auto'}
        >
          <Image 
            src={image} 
            objectFit={'cover'} 
            layout="fill" 
            unoptimized 
            loader={wordpressImageLoader}
            alt={props.post?.title}
          />
        </Flex>
      </PostLink>
    }
    { !props.linkable &&
      <Flex
        position={'relative'}
        {...props}
      >
        <Image 
          src={image} 
          objectFit={'cover'} 
          layout="fill" 
          unoptimized 
          loader={wordpressImageLoader}
          alt={props.post?.title}
        />
      </Flex>
    }
  </>
  )
};

export default PostImage;