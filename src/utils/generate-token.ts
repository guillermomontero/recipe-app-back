import jwt from 'jsonwebtoken';

export const generateToken = (user: Object) => {
  const expiresIn = 60 * 60;
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET || 'tokentest', { expiresIn });

  return { token, expiresIn };
}