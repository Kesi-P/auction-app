import { Resolver, Query,Ctx, Mutation, InputType, Field,Arg } from "type-graphql";
import { UserEntity } from "../entities/User";
import { AuctionEntity } from "../entities/Auction"
import { MyContext } from "./mycontext";
import { AuctionStatus, EntityInitData, ItemCategory } from '../types/types'
import { wrap } from '@mikro-orm/core';


@InputType()
class UserInput{
    @Field()
    name: string
}
@Resolver()
export class Auctionsesolver {
    // @Query(() => [AuctionEntity])
    // auctions(@Ctx() {em}:MyContext):Promise<AuctionEntity[]> {
   
    // return em.find(AuctionEntity,{})
    // }
    
    @Mutation(()=>AuctionEntity)
    async regisAuction(
       // @Arg("input") input: AuctionEntity,
        @Ctx() {em}:MyContext     
        ){
        
        const theid ='0074d48d-6a07-4060-b981-4b7cef5a35aa'
        const thename = 'Kate Moss'
        const user = await em.findOne(AuctionEntity,{seller:theid});
        if(user){
            const userUp = wrap(user).assign({
                seller: theid,
    title: 'Auction TitleKKuay',
    description: 'Auction Description',
    category: ItemCategory.ANIMALS,
    startPrice: 100,
    terminateAt: '2023-12-31',
    status: AuctionStatus.ON_GOING,
    createdAt: new Date(), // Ensure createdAt is properly initialized
    updatedAt: new Date(),
            })
        
              return userUp
        }else{

        
            
            // User does not exist, create new user
            const auctionNew = em.create(AuctionEntity,{
                seller: theid,
    title: 'Auction Title2',
    description: 'Auction Description',
    category: ItemCategory.ANIMALS,
    startPrice: 100,
    terminateAt: '2023-12-31',
    status: AuctionStatus.ON_GOING,
    createdAt: new Date(), // Ensure createdAt is properly initialized
    updatedAt: new Date(), //


            })
            await em.persistAndFlush(auctionNew)
            return auctionNew

        }
        }
}