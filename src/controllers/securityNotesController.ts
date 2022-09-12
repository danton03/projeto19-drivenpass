import { Request, Response } from "express";
import { TSecurityNotes } from "../types/securityNotesTypes";
import { createSecurityNoteService, deleteSecurityNoteService, getSecurityNotesService } from "../services/securityNotesServices";

export async function createSecurityNote(req:Request, res:Response) {
  const { title, text } : TSecurityNotes = req.body;
  const token = req.headers["authorization"];
  await createSecurityNoteService(title, text, token);
  res.sendStatus(201);
}

export async function getSecurityNotes(req:Request, res:Response) {
  const token = req.headers["authorization"];
  const noteId = req.query.id;
  const securityNotes = await getSecurityNotesService(noteId, token);
  res.send(securityNotes).status(200);
}

export async function deleteSecurityNote(req:Request, res:Response) {
  const token = req.headers["authorization"];
  const noteId = Number(req.params.id);
  await deleteSecurityNoteService(noteId, token);
  return res.sendStatus(200);
}