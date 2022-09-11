import { Credentials } from '@prisma/client';

export type TCredential = Omit<Credentials, "id"|"userId">;
export type TCreateCredential = Omit<Credentials, "id">;