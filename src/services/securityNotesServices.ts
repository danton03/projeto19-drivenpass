import { validateToken } from "../utils/verifyToken";
import { findAllSecurityNotes, findNoteById, storeSecurityNote, findByTitleAndUserId, deleteNoteById } from "../repositories/securityNotesRepository";

export async function createSecurityNoteService(title: string, text: string, token: string){
  const userId = Number(validateToken(token));
  const findOne=await findByTitleAndUserId(title,userId);
 
  if (findOne.length !== 0) {
    throw {
      type: 'conflict', 
      message: 'Já existe uma nota com esse título'
    }
  }

  const noteData = {
    userId,
    title,
    text
  }
  await  storeSecurityNote(noteData);
}


export async function getSecurityNotesService(noteId: any, token: string){
  //Valida o token
  const userId = Number(validateToken(token));

  //Verifica se o usuário deseja uma nota específica e repassa a query necessária
  if(noteId){
    const id = Number(noteId)
    //verifica se o id repassado é mesmo um número
    if(isNaN(id)){
      throw {
        type: 'bad_request',
        message: 'O id informado é inválido'
      } 
    }

    const securityNote = await findNoteById(id);

    if(!securityNote){
      throw {
        type: 'not_found', 
        message: 'A nota segura não foi encontrada'
      }
    }

    if(userId !== securityNote.userId){
      throw {
        type: 'unauthorized', 
        message: 'Sem permissão para acessar essa nota'
      };
    }

    return securityNote;
  }

  const securityNotes = await findAllSecurityNotes(userId);
  return securityNotes;
}

export async function deleteSecurityNoteService(noteId: number, token: string){
  const userId =  Number(validateToken(token));

  //verifica se o id repassado é mesmo um número
  if(isNaN(noteId)){
    throw {
      type: 'bad_request',
      message: 'O id informado é inválido'
    } 
  }

  const securityNote = await findNoteById(noteId);
  if(!securityNote){
    throw {
      type: 'not_found', 
      message: 'A nota segura não foi encontrada'
    }
  }

  if(userId !== securityNote.userId){
    throw {
      type: 'unauthorized', 
      message: 'Sem permissão para excluir essa nota'
    }
  }

  await deleteNoteById(noteId);
}
