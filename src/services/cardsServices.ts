import { validateToken } from "../utils/verifyToken";
import { findAllCards, findCardById, storeCard, findByTitleAndUserId, deleteCardById } from "../repositories/cardsRepository";
import { TCard, TCardFull } from "../types/cardTypes";
import Cryptr from "cryptr";

const ENCRYPT_KEY: string = String(process.env.CRYPTR_SECRET_KEY);
const cryptr = new Cryptr(ENCRYPT_KEY);

export async function createCardService(cardData: TCard, token: string){
  const { title } = cardData;
  const userId = Number(validateToken(token));
  const findCard = await findByTitleAndUserId( title, userId );

  if (findCard.length !== 0) {
    throw {
      type: 'conflict', 
      message: 'Já existe um cartão com esse título'
    }
  }

  const encryptedPassword =  cryptr.encrypt(cardData.password);
  const encryptedCvc =  cryptr.encrypt(cardData.cvc);

  const cardToStore = {
    ...cardData,
    name: cardData.name.toUpperCase(),
    userId,
    password: encryptedPassword,
    cvc: encryptedCvc
  }

  await  storeCard(cardToStore);
}


export async function getCardsService(cardId: any, token: string){
  //Valida o token
  const userId = Number(validateToken(token));

  //Verifica se o usuário deseja uma nota específica e repassa a query necessária
  if(cardId){
    const id = Number(cardId)
    //verifica se o id repassado é mesmo um número
    if(isNaN(id)){
      throw {
        type: 'bad_request',
        message: 'O id informado é inválido'
      } 
    }

    const card = await findCardById(id);

    if(!card){
      throw {
        type: 'not_found', 
        message: 'O cartão não foi encontrado'
      }
    }

    if(userId !== card.userId){
      throw {
        type: 'unauthorized', 
        message: 'Sem permissão para acessar esse cartão'
      };
    }

    const cardDecrypted = {
      ...card,
      password: cryptr.decrypt(card.password),
      cvc: cryptr.decrypt(card.cvc)
    }
    delete card.userId;
    return cardDecrypted;
  }

  const cards = await findAllCards(userId);
  const cardDecrypted = cards.forEach(card => {
    delete card.userId;
    card.password = cryptr.decrypt(card.password),
    card.cvc = cryptr.decrypt(card.cvc)
  }); 
  return cardDecrypted;
}

export async function deleteCardService(cardId: number, token: string){
  const userId =  Number(validateToken(token));

  //verifica se o id repassado é mesmo um número
  if(isNaN(cardId)){
    throw {
      type: 'bad_request',
      message: 'O id informado é inválido'
    } 
  }

  const card = await findCardById(cardId);
  if(!card){
    throw {
      type: 'not_found', 
      message: 'O cartão não foi encontrado'
    }
  }

  if(userId !== card.userId){
    throw {
      type: 'unauthorized', 
      message: 'Sem permissão para excluir esse cartão'
    }
  }

  await deleteCardById(cardId);
}
