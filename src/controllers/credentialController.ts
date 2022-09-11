import { Request, Response } from "express";
import { createCredentialService, deleteCredentialsService, getCredentialsService } from "../services/credentialServices";

export async function createCredential(req: Request, res: Response) {
  const token = req.headers['authorization'];
  const credentialData = req.body;
  await createCredentialService(token, credentialData);
  res.sendStatus(201);
}

export async function getCredentials(req: Request, res: Response) {
  const token = req.headers['authorization'];
  const credentialId = req.query.id;
  const credentials = await getCredentialsService(token, credentialId);
  res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
  const token = req.headers['authorization'];
  const credentialId = req.params.id;
  await deleteCredentialsService(token, credentialId);
  res.sendStatus(200);
}