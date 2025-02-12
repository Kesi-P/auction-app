import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { UserEntity } from "./User";
import { AuctionStatus, EntityInitData, ItemCategory } from "../types/types";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ tableName: 'auctions'})
export class AuctionEntity extends BaseEntity {
    constructor(init: EntityInitData<AuctionEntity, 'seller' | 'title' | 'description' | 'category' | 'startPrice' | 'terminateAt' | 'status' >) {
        super(init);
        this.seller = init.seller;
        this.title = init.title;
        this.description = init.description;
        this.category = init.category;
        this.startPrice = init.startPrice;
        this.terminateAt = init.terminateAt;
        this.status = init.status;
    }

    @ManyToOne({
        entity: () => UserEntity,
        name: 'seller_id',
        cascade: [],
        onDelete: 'cascade',
        onUpdateIntegrity: 'cascade',
        columnType: 'uuid',
      })
    seller: UserEntity;
    @Field()
    @Property({ columnType: 'varchar(225)' })
    title: string;
    @Field()
    @Property({ columnType: 'text' })
    description: string;
    
    @Enum({ items: () => ItemCategory })
    category: ItemCategory;
    @Field()
    @Property({ columnType: 'integer'})
    startPrice: number;
    @Field()
    @Property()
    terminateAt: Date;
    
    @Enum({items: () => AuctionStatus, default: AuctionStatus.ON_GOING })
    status: AuctionStatus;
}