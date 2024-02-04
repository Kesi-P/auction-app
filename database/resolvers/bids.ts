import { Resolver, Query, Ctx, Mutation, InputType, Field, Arg, ObjectType } from "type-graphql";
import { UserEntity } from "../entities/User";
import { AuctionEntity } from "../entities/Auction";
import { MyContext } from "./mycontext";
import { BidEntity } from "../entities";
import { wrap } from '@mikro-orm/core';

@InputType()
class AuctionInput {
    @Field()
    userId: string;

    @Field()
    auctionId: string;
}

@InputType()
class BidInput extends AuctionInput {
    @Field()
    price: number;

    @Field()
    isMax: boolean;
}

@ObjectType()
class BidResponse {
    @Field(() => BidEntity, { nullable: true })
    bid: BidEntity | null;
}

@Resolver()
export class BidsResolver {

    @Query(() => BidResponse)
    async getMaxAndAddMax(
        @Arg("input") input: AuctionInput,
        @Ctx() { em }: MyContext
    ): Promise<BidResponse> {
        try {
            const maxBid = await em.findOne(BidEntity, { auction: input.auctionId }, { orderBy: { isMaximum: 'DESC' } });

            if (maxBid && maxBid.bidder.id === input.userId) {
                const updateMaimum = wrap(maxBid).assign({ isMaximum: true });
                await em.flush();
                return {bid :updateMaimum};
            }
            return {bid:null};
        } catch (error) {
            console.error('Error:', error);
            return {bid:null};
        }
    }

    @Mutation(() => BidResponse)
    async regisBid(
        @Arg("inputBid") inputBid: BidInput,
        @Ctx() { em }: MyContext
    ): Promise<BidResponse> {
        try {
            const user = await em.findOne(BidEntity,{bidder:inputBid.userId,auction:inputBid.auctionId,isMaximum:false});
            const addPrice = await em.findOneOrFail(BidEntity, {auction: inputBid.auctionId})
            const exPired = await em.findOneOrFail(AuctionEntity, {id: inputBid.auctionId})
            let auctionExpired = true
            // if (exPired.terminateAt < new Date()) {
            //     auctionExpired = false
            //     return { bid: null }; // Auction is expired
            // }
            if(exPired.terminateAt > new Date()){

            
            if (user && user.price > inputBid.price) {
                // wrap(user).assign({ price: inputBid.price,updatedAt: new Date() });
                // await em.flush();
                user.price = inputBid.price;
                user.updatedAt = new Date();
                addPrice.price += 1; // Increment start price
                await em.flush();
                return { bid: user };
            }

            if (!user) {
                const newBid = em.create(BidEntity, {
                    bidder: inputBid.userId,
                    auction: inputBid.auctionId,
                    price: inputBid.price,
                    isMaximum: inputBid.isMax,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                await em.persistAndFlush(newBid);
                return { bid: newBid };
            }
        }
            
                return { bid: null };
        } catch (error) {
            console.error('Error:', error);
            return { bid: null }; // Handle errors
        }
    }
}
