import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import User from '../models/user.model';
import { generateToken } from '../utils/generate-token';
import jwt from 'jsonwebtoken';

interface IPayload {
  data: {
    _id: string,
    code: string
  }
}

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const body = req.body;
  
    try {
      // Check email
      const userDB = await User.findOne(
        { email: body.email, active: true }, 
        { allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0 }
      )
  
      if (!userDB) {
        return res.status(400).json({
          message: 'Invalid user or password',
        });
      }
      
      // If user exist, check password
      if (!bcrypt.compareSync(body.password, userDB.password)) {
        return res.status(400).json({
          message: 'Invalid user or password',
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

  static verifyAccount = async (req: Request, res: Response) => {
    const { token } = req.params;
    const data = verifyToken(token);

    // Verify if has data
    if (!data) return res.status(404).json({ success: false, message: 'Token not valid' });

    const { _id, code } = data.data;
    const userDB = await User.findOne({ _id });

    // Verify user exists
    if (!userDB) return res.status(404).json({ success: false, message: 'User not find' });
    // Verify code it´s equal to userDB code
    if (code !== userDB.verificationCode) return res.redirect('http://localhost:8081/verify-account-error');

    userDB.state = 1;
    userDB.verificationCode = '';

    // Save user
    await userDB.save();

    // Redirect to confirm account page
    res.redirect('http://localhost:8081/verify-account');
  };
}

const editLastSession = async (id: any) => {
  try {
    await User.findByIdAndUpdate(id, { $set: { lastSession: new Date().toISOString() }}, { new: true, runValidators: true, context: 'query' });
    return true;
  } catch (error) {
    return error;
  }
};

const verifyToken = (token: string) => {
  if (!token) return false;

  const payload = jwt.verify(token, process.env.JWT_SECRET || '') as IPayload;

  if (payload) return payload;
  return false;
};

export default AuthController;
