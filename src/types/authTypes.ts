import { Users } from '@prisma/client';

export type IUserDataWithoutId = Omit<Users, 'id'>;
export type IUserData = Users;