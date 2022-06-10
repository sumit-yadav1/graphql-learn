import { mutationResolver } from "./mutation.js";
import { queryResolver } from "./query.js";

export const resolvers = {
  ...queryResolver,
  ...mutationResolver,
};
