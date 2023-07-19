import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import User from '../models/user.model';
import { generateToken } from '../utils/generate-token';
import { ObjectId } from 'mongoose';

const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
  const body = req.body;
  body.password = bcrypt.hashSync(req.body.password, saltRounds);

  try {
    const userDB = await User.create(body);

    res.json(userDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const login = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    // Check email
    const userDB = await User.findOne(
      { email: body.email }, 
      { cardNumber: 0, cardExpires: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0 }
    )

    if (!userDB) {
      return res.status(400).json({
        message: 'Invalid user',
      });
    }
    
    // If user exist, check password
    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    const dataToToken = {
      _id: userDB._id,
      name: userDB.name
    }

    const token = generateToken(dataToToken);
    userDB.password = '';

    await editLastSession(userDB._id);

    res.json({
      userDB,
      token
    });

  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred on /Auth/login',
      error
    });
  };
};

const editLastSession = async (id: any) => {
  try {
    await User.findByIdAndUpdate(id, { $set: { lastSession: new Date().toISOString() }}, { new: true, runValidators: true, context: 'query' });
    return true;
  } catch (error) {
    return error;
  }
};