import { posts } from "../../tempData.js";

export const mutationResolver = {
  Mutation: {
    createPost: (_, { post }) => {
      const newPost = {
        id: posts.length++,
        title: post.title,
        description: post.description,
      };

      return newPost;
    },
  },
};
