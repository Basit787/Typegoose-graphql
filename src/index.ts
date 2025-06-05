import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./db/index.js";
import { resolvers } from "./graphql/index.resolver.js";
import { typeDefs } from "./graphql/index.typeDef.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await connectDB(async (res) => {
  try {
    if (res) {
      const { url } = await startStandaloneServer(server, {
        listen: { port: 5000 },
      });

      console.log(`🚀 GraphQL Server ready at ${url}`);
    }
  } catch (error) {
    console.log(error);
  }
});
