import { Request, Response } from "express";
import _ from 'underscore';
import path from "node:path";
import User from '../models/user.model';
import Recipe from '../models/recipe.model';

export const uploadAvatar = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const ext = req.file ? path.extname(req.file.originalname) : '.jpg';
  const payload = {
    imageProfile: `${process.env.BASE_URL}/uploads/images/avatar/${req.params.id}${ext}`
  };

  const body = _.pick(payload, ['imageProfile']);

  try {
    await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.send({ cod: 1, msg: 'Image uploaded successfully'});
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const uploadRecipe = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const ext = req.file ? path.extname(req.file.originalname) : '.jpg';
  const payload = {
    photo: `${process.env.BASE_URL}/uploads/images/recipe/${req.params.id}${ext}`
  };
  
  const body = _.pick(payload, ['photo']);

  try {
    await Recipe.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.send({ cod: 1, msg: 'Image uploaded successfully'});
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};