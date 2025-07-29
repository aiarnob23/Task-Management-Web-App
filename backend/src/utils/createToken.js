import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export const createToken = (
  jwtPayload,
) => {
  const payload = typeof jwtPayload === 'string' ? { data: jwtPayload } : jwtPayload;
  
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '14d'
  });
  return `${token}`;
};