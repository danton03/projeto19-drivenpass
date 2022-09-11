import { Request, Response } from "express";
import { createCredentialService } from "../services/credentialServices";

export async function createCredential(req: Request, res: Response) {
  const token = req.headers['authorization'];
  const credentialData = req.body;
  await createCredentialService(token, credentialData);
  res.sendStatus(201);
}