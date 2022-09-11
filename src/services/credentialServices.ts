import { findCredentialByUserIdAndTitle, storeCredential } from "../repositories/credentialRepository";
import { TCreateCredential } from "../types/credentialTypes";
import { validateToken } from "../utils/verifyToken";

export async function createCredentialService(token: string, credentialData: TCreateCredential) {
  //Valida o token
  const userId = Number(validateToken(token));
  //Verifica se não existe uma credencial com aquele título para o usuário
  const { title } = credentialData;
  const credentialExists = await findCredentialByUserIdAndTitle(userId, title);
  if (credentialExists) {
    throw {
      type: 'conflict',
      message: 'Já existe uma credencial cadastrada com esse título'
    }  
  }

  //Salva a credencial
  const credential: TCreateCredential = {
    ...credentialData,
    userId
  }
  await storeCredential(credential);
}