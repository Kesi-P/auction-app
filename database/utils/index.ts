import { MikroORM } from "@mikro-orm/postgresql";
import { UserEntity } from "../entities/User";
import mikroOrmConfig from "../mikro-orm.config";
import express, { Application, Request, Response } from 'express';

import { buildSchema } from "type-graphql";
import { TestResolver } from "../resolvers/test";
const { ApolloServer } = require("apollo-server-express");
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up()

  const app = express();
  
  const apollerServer = new ApolloServer({
    schema:await buildSchema({
      resolvers:[TestResolver],
      validate:false
    })
  })
  //create graphql-endpoit on express
  apollerServer.applyMiddleware({app })
  
  app.listen(8000, () => {
    console.log('Server started')
  })
  // const users = await orm.em.find(UserEntity, {})


  // console.log(users)
}

main().catch((err) =>{
  console.error(err)
})