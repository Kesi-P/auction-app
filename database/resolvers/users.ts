import { Resolver, Query,Ctx } from "type-graphql";
import { UserEntity } from "../entities/User";
import { MyContext } from "./mycontext";
import { EntityInitData } from '../types/types'
import {BidEntity} from '../entities/Bid'
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
    
}