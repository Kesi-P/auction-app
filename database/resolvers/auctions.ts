import { Resolver, Mutation, Arg, Ctx, ObjectType, Field, InputType, registerEnumType } from "type-graphql";
import { UserEntity } from "../entities/User";
import { AuctionEntity } from "../entities/Auction";
import { MyContext } from "./mycontext";
import { AuctionStatus, ItemCategory } from '../types/types';
import { EntityManager } from '@mikro-orm/mysql';

// Register the enum types with TypeGraphQL
registerEnumType(ItemCategory, {
    name: 'ItemCategory',
});

registerEnumType(AuctionStatus, {
    name: 'AuctionStatus',
});

@InputType()
class AuctionInputnew {
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



@Resolver()
export class AuctionResolver {
    @Mutation(() => AuctionEntity)
    async regisAuction(
        @Arg("input") input: AuctionInputnew,
        @Ctx() { em }: MyContext
    ) {
        try {
            const newAuction = em.create(AuctionEntity, {
                seller: input.userId,
                title: input.title,
                description: input.description,
                category: input.category,
                startPrice: input.startPrice,
                terminateAt: input.terminate, // Consistency in field name
                status: AuctionStatus.ON_GOING,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await em.persistAndFlush(newAuction);
            return newAuction
        } catch (error) {
            throw new Error('Failed to create auction.'); // Example of handling errors more gracefully
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