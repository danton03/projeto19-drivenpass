import { validateToken } from "../utils/verifyToken";
import { findAllWifis, findWifiById, storeWifi, deleteWifiById } from "../repositories/wifisRepository";
import { TCreateWifi } from "../types/wifiTypes";
import Cryptr from "cryptr";

const ENCRYPT_KEY: string = String(process.env.CRYPTR_SECRET_KEY);
const cryptr = new Cryptr(ENCRYPT_KEY);

export async function createWifiService(wifiData: TCreateWifi, token: string){
  const userId = Number(validateToken(token));
  const encryptedPassword =  cryptr.encrypt(wifiData.password);
  const wifiToStore = {
    ...wifiData,
    userId,
    password: encryptedPassword,
  }

  await  storeWifi(wifiToStore);
}

export async function getWifisService(wifiId: any, token: string){
  //Valida o token
  const userId = Number(validateToken(token));

  //Verifica se o usuário deseja um wifi específico e repassa a query necessária
  if(wifiId){
    const id = Number(wifiId)
    //verifica se o id repassado é mesmo um número
    if(isNaN(id)){
      throw {
        type: 'bad_request',
        message: 'O id informado é inválido'
      } 
    }

    const wifi = await findWifiById(id);

    if(!wifi){
      throw {
        type: 'not_found', 
        message: 'Não foi encontrado um wifi com o id informado'
      }
    }

    if(userId !== wifi.userId){
      throw {
        type: 'unauthorized', 
        message: 'Não é possível acessar o wifi com esse id'
      };
    }

    const wifiDecrypted = {
      ...wifi,
      password: cryptr.decrypt(wifi.password),
    }

    delete wifiDecrypted.userId;
    return wifiDecrypted;
  }

  const wifis = await findAllWifis(userId);
  const wifiDecrypted = wifis.map(wifi => {
    delete wifi.userId;
    wifi.password = cryptr.decrypt(wifi.password);
    return wifi;
  }); 
  return wifiDecrypted;
}

export async function deleteWifiService(wifiId: number, token: string){
  const userId =  Number(validateToken(token));

  //verifica se o id repassado é mesmo um número
  if(isNaN(wifiId)){
    throw {
      type: 'bad_request',
      message: 'O id informado é inválido'
    } 
  }

  const wifi = await findWifiById(wifiId);
  if(!wifi){
    throw {
      type: 'not_found', 
      message: 'Não foi encontrado um wifi com o id informado'
    }
  }

  if(userId !== wifi.userId){
    throw {
      type: 'unauthorized', 
      message: 'Não é possível excluir o wifi com esse id'
    }
  }

  await deleteWifiById(wifiId);
}
