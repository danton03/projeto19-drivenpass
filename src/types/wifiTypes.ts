import {Wifis} from "@prisma/client"

export type TWifi = Omit<Wifis,'id'>;
export type TCreateWifi = Omit<Wifis,'id'>;