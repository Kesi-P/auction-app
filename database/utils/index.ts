import 'reflect-metadata'
import { MikroORM } from "@mikro-orm/postgresql";
import { UserEntity } from "../entities/User";
import mikroOrmConfig from "../mikro-orm.config";
import express, { Application, Request, Response } from 'express';

import { buildSchema } from "type-graphql";
import { TestResolver } from "../resolvers/test";
import { UsersResolver } from "../resolvers/users";
const { ApolloServer } = require("apollo-server-express");
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up()

  const app = express();
  
  const apollerServer = new ApolloServer({
    schema:await buildSchema({
      resolvers:[TestResolver,UsersResolver],
      validate:false      
    }),
    //obj that can be excessablr to  all the respons
    context: () => ({ em: orm.em})
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