import { ApolloServer } from "@apollo/server";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import typeDefs from "./graphql/typeDef.js";
import resolvers from "./graphql/resolver.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import ENV from "./lib/env.js";
import { connectDB } from "./db/index.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await connectDB(async (res) => {
  try {
    if (res) {
      const { url } = await startStandaloneServer(server);
      console.log(`🚀 Server ready at ${url}`);
      serve(
        {
          fetch: app.fetch,
          port: ENV.PORT,
        },
        (info) => {
          console.log(`Server is running on http://localhost:${info.port}`);
        },
      );
    }
  } catch (error) {
    console.log(error);
  }
});
