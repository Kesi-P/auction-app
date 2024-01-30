import { MikroORM } from "@mikro-orm/postgresql";
import { UserEntity } from "../entities/User";
import mikroOrmConfig from "../mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up()

  const users = await orm.em.find(UserEntity, {})


  console.log(users)
}

main().catch((err) =>{
  console.error(err)
})