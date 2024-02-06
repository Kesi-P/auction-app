import { Entity, PrimaryKey, Property, } from "@mikro-orm/core";
import { CreateDateColumn,UpdateDateColumn } from 'typeorm'
import { v4 } from "uuid";
import { UUID } from "../types/types";
import { hasOwn } from "../types/helper";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ abstract: true })
export abstract class BaseEntity {
constructor(init: {}) {
        this.id =  hasOwn(init, 'id') ? init.id : v4();
        this.createdAt = hasOwn(init, 'createdAt') ? init.createdAt : new Date();
        this.updatedAt = hasOwn(init, 'updatedAt') ? init.updatedAt : new Date();
    }
    @Field()
    @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id: UUID;

    //@Field()
    @Property({ type: 'date' })
    createdAt: Date;

    //@Field()
    @Property({ type: 'date',onUpdate: () => new Date() })
    updatedAt: Date;
}