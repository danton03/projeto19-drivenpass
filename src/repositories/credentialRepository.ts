import { prisma } from "../config/database";
import { TCreateCredential } from "../types/credentialTypes";

export async function storeCredential(credentialData: TCreateCredential) {
  await prisma.credentials.create({
    data: credentialData
  });
}

export async function findCredentialByUserIdAndTitle(userId: number, title: string) {
  const credential = await prisma.credentials.findMany({
    where:{ 
      userId,  
      title
    }
  });

  return credential[0];
}

export async function findCredentialsById(credentialId: number, userId: number) {
  const credentials = await prisma.credentials.findMany({
    where:{ 
      id: credentialId, 
      userId 
    }
  });

  return credentials;
}
