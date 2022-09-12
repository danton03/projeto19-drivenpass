import { prisma } from "../config/database";
import { TCard } from "../types/cardTypes";


export async function storeCard(dataList:TCard){
  await prisma.cards.create({
   data: dataList
  });
}

export async function findByTitleAndUserId(title:string, userId:number){
  const card = await prisma.cards.findMany({
   where:{
    userId,
    title
   }
  });
  
  return card;
}

export async function findCardById(id:number) {
  const card = await prisma.cards.findUnique({
   where:{
    id
   }
  });
  
  return card;
}

export async function findAllCards(userId:number){
  const cards = await prisma.cards.findMany({
   where:{
    userId
   }
  });
  
  return cards;
}

export async function deleteCardById(id:number){
  await prisma.cards.delete({
   where:{
    id
   }
  }); 
}