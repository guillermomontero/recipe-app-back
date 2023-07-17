import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
  _id: string
}

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).json('Access denied');

  const payload = jwt.verify(token, process.env.JWT_SECRET || 'tokentest') as IPayload;
  if (!payload) return res.status(404).json('Token not valid');
  next();
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json('Access denied');

  const payload = jwt.verify(token, process.env.JWT_SECRET || 'tokentest') as IPayload;
  if (!payload) return res.status(404).json('Token not valid');

  const role = req.body.user.role;
  if (role !== 'ADMIN') return res.status(401).json({ message: 'Invalid user' });
  
  next();
};
