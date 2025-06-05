import ProductResolver from "./resolvers/products.resolver.js";
import UserResolvers from "./resolvers/users.resolver.js";

export const resolvers = [UserResolvers, ProductResolver];
