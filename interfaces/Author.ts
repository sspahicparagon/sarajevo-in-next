type Avatar = {
  node: AvatarNode;
};

type AvatarNode = {
  firstName: string;
  lastName: string;
  name: string;
  avatar: AvatarImage
};

type AvatarImage = {
  url: string;
}

const authorFragmentQuery: string =
  `
    name
    firstName
    lastName
    avatar {
      url
    }
  `;

export { authorFragmentQuery };

export default Avatar;