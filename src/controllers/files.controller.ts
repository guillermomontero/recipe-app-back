import { Request, Response } from "express";
import path from "node:path";
import _ from 'underscore';
import { generateToken } from '../utils/generate-token';
import User from '../models/user.model';
import Recipe from '../models/recipe.model';

export const uploadAvatar = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const timestamp = req.params.timestamp;
  const ext = req.file ? path.extname(req.file.originalname) : '.jpg';
  const payload = { imageProfile: `${process.env.BASE_URL}/uploads/images/avatar/${_id}-${timestamp}${ext}` };
  const body = _.pick(payload, ['imageProfile']);

  try {
    await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
    const userDB = await User.findOne({ _id }, { password: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0, role: 0, favorites: 0 });

    const dataToToken = {
      _id: userDB?._id,
      name: userDB?.name
    }

    const token = generateToken(dataToToken);

    res.json({
      userDB,
      token
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const uploadRecipe = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const timestamp = req.params.timestamp;
  const ext = req.file ? path.extname(req.file.originalname) : '.jpg';
  const payload = { photo: `${process.env.BASE_URL}/uploads/images/recipe/${_id}-${timestamp}${ext}` };
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
