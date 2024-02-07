import { Resolver, Query, Ctx, Mutation, InputType, Field, Arg, ObjectType } from "type-graphql";
import { UserEntity } from "../entities/User";
import { AuctionEntity } from "../entities/Auction";
import { MyContext } from "./mycontext";
import { BidEntity } from "../entities";
import { wrap } from '@mikro-orm/core';
import { AuctionStatus, ItemCategory } from '../types/types';

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
class FieldError {
    
    @Field()
    message: string;
  }

@ObjectType()
class BidResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => BidEntity, { nullable: true })
    bid?: BidEntity;
}

@Resolver()
export class BidsResolver {

    @Mutation(() => BidResponse)
    async getMaxAndAddMax(
        @Arg("input") input: AuctionInput,
        @Ctx() { em }: MyContext
    ): Promise<BidResponse> {
        try {
            const maxBid = await em.findOne(BidEntity, { auction: input.auctionId }, { orderBy: { isMaximum: 'DESC' } });
            const updatePrice = await em.findOne(AuctionEntity,{id:input.auctionId})
            if (maxBid && maxBid.bidder.id === input.userId) {
                const updateMaimum = wrap(maxBid).assign({ isMaximum: true });
                wrap(updatePrice).assign({startPrice:maxBid.price})
                await em.flush();
                return {bid :updateMaimum};
            }
            return {
                errors: [
                  {
                    message: "You bid is the maximum",
                  },
                ],
              };;
        } catch (error) {
            console.error('Error:', error);
            return {
                errors: [
                  {
                    message: "Error",
                  },
                ],
              };
        }
    }

    @Mutation(() => BidResponse)
    async regisBid(
        @Arg("inputBid") inputBid: BidInput,
        @Ctx() { em }: MyContext
    ): Promise<BidResponse> {
        try {
            const user = await em.findOne(BidEntity,{bidder:inputBid.userId,auction:inputBid.auctionId,isMaximum:false});
            const addPrice = await em.findOne(BidEntity, {auction: inputBid.auctionId})
            const exPired = await em.findOne(AuctionEntity, {id: inputBid.auctionId})
            // console.log('user',user)
            // if (exPired && exPired.terminateAt <= new Date() && exPired.startPrice < inputBid.price) {
            //     const upDateAuctions = wrap(exPired).assign({
            //         status : AuctionStatus.FINISHED                    
            //     })
            //     await em.flush()
            //     return {
            //         errors: [
            //           {
            //             message: "The auction is expired",
            //           },
            //         ],
            //       };; // Auction is expired
            // }
            if(exPired && exPired.status == AuctionStatus.ON_GOING){

            
            if (user && user.price > inputBid.price && addPrice) {
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
            
        return {
            errors: [
              {
                message: "not found",
              },
            ],
          };
        } catch (error) {
            console.error('Error:', error);
            return {
                errors: [
                  {
                    message: "Error",
                  },
                ],
              };
        }
    }
}
