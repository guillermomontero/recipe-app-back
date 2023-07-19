import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import _ from 'underscore';
import User from '../models/user.model';

const saltRounds = 10;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usersDB = await User.find({}, { password: 0, cardNumber: 0, cardExpires: 0 });
    
    res.send(usersDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const payload = req.body;
  payload.password = bcrypt.hashSync(req.body.password, saltRounds);

  try {
    const userDB = new User(payload);
    await userDB.save();

    res.json(userDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const getUser = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const userDB = await User.find({ _id }, { password: 0, cardNumber: 0, cardExpires: 0 });
    res.json(userDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    await User.findByIdAndDelete({ _id });
    const usersDB = await User.find();

    res.json(usersDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const editUser = async (req: Request, res: Response) => {
  const _id = req.body._id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'name',
    'lastName',
    'email',
    'telephone',
    'location',
    'imageProfile',
    'cardNumber',
    'cardExpires',
    'password',
    'allowEmail',
    'notifications'
  ]);

  try {
    const userDB = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(userDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};