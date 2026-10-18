import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import {
  ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  dotenv.config();

  database.connect();
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  app.use(cors());
  // // Rest API|
  // app.get("/articles", async (req: Request, res: Response) => {
  //   const articles = await Article.find({
  //     deleted : false
  //   })
  //   res.json({
  //     articles: articles
  //   });
  // });

  //------------Graphql


  

  const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
  });

  await server.start();
  
  server.applyMiddleware({
    app: app as any,
    path: "/graphql",
    cors: false
  });

  //------------Graphql end

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

startServer();
