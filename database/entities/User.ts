import {  Entity, Property, Unique } from "@mikro-orm/core";
import { EntityInitData } from "../types/types";
import { BaseEntity } from "./BaseEntity";
import { Field , ObjectType} from "type-graphql";
import { OneToMany } from "typeorm";
import { AuctionEntity } from "./Auction";
import { Collection } from '@mikro-orm/core';

@ObjectType()
@Entity({ tableName: 'users'})
export class UserEntity extends BaseEntity {
    constructor(init: EntityInitData<UserEntity,'name'>) {
        super(init);
        this.name = init.name;
    }
 
    @Unique()
    @Field(() => String)
    @Property({ columnType: 'varchar(255)'})
    name: string;

    // Define the one-to-many relationship with AuctionEntity
    // @OneToMany(() => AuctionEntity, (auction) => auction.seller)
    // auctions = new Collection<AuctionEntity>(this);
    // @OneToMany({ 
    //     entity: () => AuctionEntity, 
    //      })
    // seller = new Collection<AuctionEntity>(this);
   

}