import jwt from "jsonwebtoken";

export function validateToken(authorization:string){
  const token = authorization?.split(' ')[1];
  if (!token) {
    throw {type:'unauthorized' , message:'Token não enviado'}
  }

  
  const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';

  // 2 - Verifica se o token é válido
  return jwt.verify(token, SECRET, (err, decoded: jwt.JwtPayload) => {
    if (err) {
      throw{
        type: "unauthorized",
        message: "Token inválido"
      }
    }
    const { id } = decoded;
    return id
  });
}