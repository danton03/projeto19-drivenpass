import { Users } from '@prisma/client';

export type TUserDataWithoutId = Omit<Users, 'id'>;
export type TUserData = Users;