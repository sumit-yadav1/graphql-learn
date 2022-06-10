import { posts, users } from "../../tempData.js";

export const queryResolver = {
  Query: {
    title: () => "good vibes",
    name: () => "chandu",
    getAllBooks: () => [{ name: "good old days", rating: 5, qty: 10 }],
    getAllPosts: () => [
      { id: 1, title: "First post", description: "first desc..." },
      { id: 2, title: "Second post", description: "second desc..." },
    ],
    getAllUsers: () => users,
  },
};
