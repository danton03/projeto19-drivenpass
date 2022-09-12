import { prisma } from "../config/database";
import { TSecurityNotes } from "../types/securityNotesTypes";


export async function storeSecurityNote(dataList:TSecurityNotes){
  await prisma.securityNotes.create({
   data: dataList
  });
}

export async function findByTitleAndUserId(title:string, userId:number){
  const securityNote = await prisma.securityNotes.findMany({
   where:{
    userId,
    title
   }
  });
  
  return securityNote;
}

export async function findNoteById(id:number) {
  const securityNote = await prisma.securityNotes.findUnique({
   where:{
    id
   }
  });
  
  return securityNote;
}

export async function findAllSecurityNotes(userId:number){
  const securityNotes = await prisma.securityNotes.findMany({
   where:{
    userId
   }
  });
  
  return securityNotes;
}

export async function deleteNoteById(id:number){
  await prisma.securityNotes.delete({
   where:{
    id
   }
  }); 
}