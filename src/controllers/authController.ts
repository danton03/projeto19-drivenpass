import { Request, Response } from 'express';
import { createUserService, loginService } from '../services/authService';

export async function createUser(req: Request, res: Response) {
  const authData = req.body;
  await createUserService(authData);
  return res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const authData = req.body;
  const token = await loginService(authData);
  res.status(200).send({token});
}

/* export async function get(req: Request, res: Response) {
  // TODO
} */
