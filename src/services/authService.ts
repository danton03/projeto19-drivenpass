import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function login(authData: { email: string; password: string }) {
  // AQUI ACONTECERIAM ALGUMAS COISAS
  // 1 - Verificar se o usuario existe no banco de dados
  
  // 2 - Verificar se a senha dele esta correta
  if (authData.email === 'frank@gmail.com' && authData.password === '123') {
    // 3 - Gerar token JWT
    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
    const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

    const payload = {
      id: 1,
      email: authData.email,
      name: 'Frank Rocha',
      nivel: 1
    };

    const jwtConfig = {
      expiresIn: EXPIRES_IN
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);

    return token;
  }
}