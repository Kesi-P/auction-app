import { Resolver, Query,Ctx, Mutation, InputType, Field,Arg } from "type-graphql";
import { UserEntity } from "../entities/User";
import { MyContext } from "./mycontext";

@InputType()
class UserInput{
    @Field()
    name: string
}
@Resolver()
export class UsersResolver {
    @Query(() => [UserEntity])
    users(@Ctx() {em}:MyContext):Promise<UserEntity[]> {
    //   return [{
    //     id: 'e84d89b1-4557-4a72-aaf7-90edea52a192',
    //     createdAt: '2024-01-30T11:08:38.000Z',
    //     updatedAt: '2024-01-30T11:08:38.000Z',
    //     name: 'Eminem'
    //   }]
    return em.find(UserEntity,{})
    }
    
    @Mutation(()=>UserEntity)
    async login_regis(
        @Arg("input") input: UserInput,
        @Ctx() {em}:MyContext     
        ){
        
        const user = await em.findOne(UserEntity,{name:input.name});
        //localStorage.setItem('username', input.name);
        
        if (user) {
            // User already exists, return existing user            
            return user;
          }else {
            
            // User does not exist, create new user
            const userNew = em.create(UserEntity,{name: input.name, createdAt: new Date(), updatedAt:new Date()})
            await em.persistAndFlush(userNew)
            return userNew
          }

          
        }
}