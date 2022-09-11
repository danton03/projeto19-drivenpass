import { prisma } from "../config/database";
import { IUserData, IUserDataWithoutId } from "../types/authTypes";

export async function storeUser(userData: IUserDataWithoutId) {
  await prisma.users.create({
    data: userData
  });
}

export async function getUserByEmail(userEmail: string): Promise<IUserData>{
  const user = await prisma.users.findUnique({
    where: { email: userEmail }
  });
  return user;
}