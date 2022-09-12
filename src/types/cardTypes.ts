import {Cards} from "@prisma/client"

export type TCard = Omit<Cards ,'id'>;
export type TCardFull = Cards;