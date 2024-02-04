import { Resolver, Mutation, Arg, Ctx, ObjectType, Field, InputType } from "type-graphql";
import { UserEntity } from "../entities/User";
import { AuctionEntity } from "../entities/Auction";
import { MyContext } from "./mycontext";
import { AuctionStatus, ItemCategory } from '../types/types';
import { EntityManager } from '@mikro-orm/mysql';

@InputType()
class AuctionInput {
    @Field()
    userId: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => ItemCategory)
    category: ItemCategory;

    @Field()
    startPrice: number;

    @Field()
    terminate: Date;

    @Field(() => AuctionStatus)
    status: AuctionStatus;
}

@ObjectType()
class AuctionResponse {
    @Field(() => AuctionEntity, { nullable: true })
    auction: AuctionEntity | null;
}

@Resolver()
export class AuctionResolver {
    @Mutation(() => AuctionResponse)
    async regisAuction(
        @Arg("input") input: AuctionInput,
        @Ctx() { em }: MyContext
    ): Promise<AuctionResponse> {
        try {
            const existingAuction = await em.findOne(AuctionEntity, { seller: input.userId });

            if (existingAuction) {
                return { auction: null }; // Auction already exists
            } else {
                const newAuction = em.create(AuctionEntity, {
                    seller: input.userId,
                    title: input.title,
                    description: input.description,
                    category: input.category,
                    startPrice: input.startPrice,
                    terminateAt: input.terminate,
                    status: input.status,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                await em.persistAndFlush(newAuction);
                return { auction: newAuction };
            }
        } catch (error) {
            console.error('Error:', error);
            return { auction: null };
        }
    }
}


// seller: theid,
//     title: 'Auction TitleKKuay',
//     description: 'Auction Description',
//     category: ItemCategory.ANIMALS,
//     startPrice: 100,
//     terminateAt: '2023-12-31',
//     status: AuctionStatus.ON_GOING,
//     createdAt: new Date(), // Ensure createdAt is properly initialized
//     updatedAt: new Date(),