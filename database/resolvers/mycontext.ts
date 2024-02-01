import { EntityManager,IDatabaseDriver,Collection, Connection } from "@mikro-orm/core";
import { Request,Response,Express } from "express";
import session from 'express-session';
export type MyContext = {
    em: EntityManager<any>
}