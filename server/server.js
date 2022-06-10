import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { loadFilesSync, loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./src/graphql/schema/**/*.gql"))
);

dotenv.config({ path: "./src/config/.env" });

const app = express();

const httpServer = http.createServer(app);

// db
mongoose
  .connect(process.env.LIVE_DB_URL)
  .then((success) => {
    console.log(
      "database has connected to mongoose to",
      `${success.connection.host}/${success.connection.port}`
    );
  })
  .catch((err) => console.log("error found in connecting database", err));

import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers } from "./src/graphql/resolvers/index.js";

// config env file

const port = process.env.PORT || 5000;

//  applyMiddleware method ApolloServer to a specific HTTP farmework ie: Express
const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// More required logic for integrating with Express
await apolloServer.start();

apolloServer.applyMiddleware({
  app,
  // By default, apollo-server hosts its GraphQL endpoint at the
  // server root. However, *other* Apollo Server packages host it at
  // /graphql. Optionally provide this to match apollo-server.
  path: "/graphql",
});

app.get("/rest", (req, res) => {
  res.send("welcome to learning of graphql");
});

app.listen(port, () => {
  console.log(`server has started at ${port}`);
  console.log(
    `graphql server has started at ${port}${apolloServer.graphqlPath}`
  );
});
