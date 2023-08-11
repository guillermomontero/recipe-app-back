import jwt from 'jsonwebtoken';

interface IPayload {
  _id: string
}

export const refreshToken = (token: string, user: object) => {
  const expiresIn = 60 * 60 * 24 * 30;
  jwt.verify(token, process.env.JWT_SECRET_REFRESH || 'tokentest') as IPayload;
  const refreshToken = jwt.sign({ data: user }, process.env.JWT_SECRET || 'tokentest', { expiresIn });

  return { refreshToken, expiresIn };
}