import { Resolver, Mutation, Arg, Ctx, ObjectType, Field, InputType, registerEnumType, Query } from "type-graphql";
import { UserEntity } from "../entities/User";
import { AuctionEntity } from "../entities/Auction";
import { MyContext } from "./mycontext";
import { AuctionStatus, ItemCategory } from '../types/types';

// Register the enum types with TypeGraphQL
registerEnumType(ItemCategory, {
    name: 'ItemCategory',
});

registerEnumType(AuctionStatus, {
    name: 'AuctionStatus',
});

@InputType()
class AuctionInputId {
    @Field()
    auctionId: string;
}
@InputType()
class AuctionInputnew{    
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
@InputType()

@ObjectType()
class AuctionResponse {    
    @Field(() => [AuctionEntity], { nullable: true })
    auction?: AuctionEntity[] | null;
}

@Resolver()
export class AuctionResolver {
    
    @Query(() => AuctionResponse)
    async getAllAuctions(@Ctx() { em }: MyContext): Promise<AuctionResponse> {
        try {
            let auctions = await em.find(AuctionEntity, { status: AuctionStatus.ON_GOING }, { orderBy: { terminateAt: 'ASC' } });
            
            // Check if any auctions are returned
            if (auctions.length > 0) {
                // Loop through each auction
                for (let auction of auctions) {
                    // Check if the auction's terminateAt date has passed
                    if (auction.terminateAt < new Date()) {
                        auction.status = AuctionStatus.FINISHED; // Update the auction status
                        await em.flush(); // Save the changes to the database
                    }
                }
            }

            return { auction: auctions.length > 0 ? auctions : null }; // Return the auctions or null if no auctions found
        } catch (error) {
            throw new Error('Failed to get auctions.'); // Handle errors gracefully
        }
    }

    @Mutation(() => AuctionEntity)
    async regisAuction(
        @Arg("input") input: AuctionInputnew,
        @Ctx() { em }: MyContext
    ) {
        try {
            console.log('num',input.startPrice)
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

