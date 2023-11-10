import { Heading, HeadingProps } from "@chakra-ui/react";
import Post from "../../interfaces/Post";

const propsInitial: HeadingProps = {
  fontSize: {'base': '1rem', 'md': '1.5rem', 'lg': '2rem'}
}

const PostHeading = (props: HeadingProps & { post?: Post }) => {
  let temp = {...propsInitial, ...props};
  return (
    <Heading 
      p={2} 
      as={'h2'} 
      margin={'auto'}
      {...temp}
    >
      {props.post?.title}
    </Heading>
  );
};

export default PostHeading;