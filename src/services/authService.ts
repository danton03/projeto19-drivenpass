import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getUserByEmail, storeUser } from '../repositories/userRepository';
import bcrypt from "bcrypt";
import { IUserDataWithoutId } from '../types/authTypes';
import { errorHandlerMiddleware } from '../middlewares/errorMiddleware';

dotenv.config();

export async function loginService(authData: IUserDataWithoutId) {
  // 1 - Verificar se o usuario existe no banco de dados
  const user = await getUserByEmail(authData.email);
  if(!user){
    throw { 
      type: 'unauthorized',
      message: 'Email e/ou senha inválida' 
    }
  }

  // 2 - Verificar se a senha dele esta correta
  const { password } = authData;
  const encyptedPassword = user.password;
  const comparePassword = bcrypt.compareSync(password, encyptedPassword);
  if (!comparePassword) {
    throw { 
      type: 'unauthorized',
      message: 'Email e/ou senha inválida' 
    }
  }

  // 3 - Gerar token JWT
  const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
  const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

  const payload = { id: user.id };

  const jwtConfig = {
    expiresIn: EXPIRES_IN
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}

export async function createUserService(authData: IUserDataWithoutId) {
  // 1 - Verificar se o usuario jś existe no banco de dados
  const user = await getUserByEmail(authData.email);
  if(user){
    throw { 
      type: 'conflict',
      message: 'Já existe um usuário cadastrado com esse email' 
    }
  }

  // 2 - Criptografar a senha
  const { password } = authData;
  const encryptedPassword = bcrypt.hashSync(password, 12);
  const userData = {
    ...authData,
    password: encryptedPassword
  }

  // 3 - Salvar no banco de dados
  await storeUser(userData)
}