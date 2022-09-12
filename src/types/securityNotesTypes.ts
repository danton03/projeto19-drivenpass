import { SecurityNotes } from "@prisma/client"

export type TSecurityNotes = Omit<SecurityNotes,'id'>;
