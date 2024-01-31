import { EntityManager,IDatabaseDriver,Collection, Connection } from "@mikro-orm/core";

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
}