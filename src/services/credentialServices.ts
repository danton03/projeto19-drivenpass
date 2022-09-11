import { findCredentialByUserIdAndTitle, findByCredentialId, storeCredential, findByUserId, deleteByCredentialId } from "../repositories/credentialRepository";
import { TCreateCredential } from "../types/credentialTypes";
import { validateToken } from "../utils/verifyToken";
import dotenv from "dotenv";
import Cryptr from "cryptr";

dotenv.config();

const ENCRYPT_KEY: string = String(process.env.CRYPTR_SECRET_KEY);
const cryptr = new Cryptr(ENCRYPT_KEY);

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

  //criptografa a senha
  const encryptedPassword =  cryptr.encrypt(credentialData.password);

  //Salva a credencial
  const credential: TCreateCredential = {
    ...credentialData,
    userId,
    password: encryptedPassword
  }

  await storeCredential(credential);
}

export async function getCredentialsService(token: string, credentialId: any) {
  //Valida o token
  const userId = Number(validateToken(token));

  //Verifica se o usuário deseja uma credencial específica e repassa a query necessária
  if(credentialId){
    const id = Number(credentialId)
    //verifica se o id repassado é mesmo um número
    if(isNaN(id)){
      throw {
        type: 'bad_request',
        message: 'O id informado é inválido'
      } 
    }

    //procura uma credencial com o id informado
    const credential = await findByCredentialId(id, userId);
    if (!credential) {
      throw {
        type: 'not_found',
        message: 'Não foi possível encontrar a credencial com o id informado'
      }  
    }
    delete credential.userId;
    return credential;
  }

  const credentials = await findByUserId(userId);
  credentials.forEach(credential => {
    delete credential.userId;
    credential.password = cryptr.decrypt(credential.password);  
  });
  return credentials;
}

export async function deleteCredentialsService(token: string, credentialId: any) {
  //Valida o token
  const userId = Number(validateToken(token));

  //Verifica se foi repassado o id da credencial
  if(!credentialId){
    throw {
      type: 'bad_request',
      message: 'O id da credencial não foi informado'
    } 
  }

  const id = Number(credentialId)
  //verifica se o id repassado é mesmo um número
  if(isNaN(id)){
    throw {
      type: 'bad_request',
      message: 'O id informado é inválido'
    } 
  }

  //procura uma credencial com o id informado
  const credential = await findByCredentialId(id, userId);
  if (!credential) {
    throw {
      type: 'not_found',
      message: 'Não foi possível encontrar a credencial com o id informado'
    }  
  }
  await deleteByCredentialId(id);
}