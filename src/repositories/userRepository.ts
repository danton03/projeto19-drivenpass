import { prisma } from "../config/database";
import { TUserData, TUserDataWithoutId } from "../types/authTypes";

export async function storeUser(userData: TUserDataWithoutId) {
  await prisma.users.create({
    data: userData
  });
}

export async function getUserByEmail(userEmail: string): Promise<TUserData>{
  const user = await prisma.users.findUnique({
    where: { email: userEmail }
  });
  return user;
}