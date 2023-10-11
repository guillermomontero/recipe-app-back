import jwt from 'jsonwebtoken';
import { IJWTToken } from '../../types';

export const refreshToken = (token: string, user: object) => {
  const expiresIn = 60 * 60 * 24 * 30;
  jwt.verify(token, process.env.JWT_SECRET_REFRESH || '') as IJWTToken;
  const refreshToken = jwt.sign({ data: user }, process.env.JWT_SECRET || '', { expiresIn });

  return { refreshToken, expiresIn };
}
