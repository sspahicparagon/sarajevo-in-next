import Post from "../../interfaces/Post";
import ChakraNextLink from "../ChakraNextLink";

const PostLink = ({post, children}: {post?: Post, children: JSX.Element | JSX.Element[]}) => {
  return (
    <ChakraNextLink href={`/posts/${post?.slug}`} margin={'auto'}>
      {children}
    </ChakraNextLink>
  );
};

export default PostLink;