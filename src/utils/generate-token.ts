import jwt from 'jsonwebtoken';

export const generateToken = (user: Object) => {
  const expiresIn = 60 * 60 * 24 * 30;
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET || '', { expiresIn });

  return { token, expiresIn };
}