import { Request, Response } from 'express';
import Category from '../models/category.model';
import _ from 'underscore';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categoriesDB = await Category.find();
    
    res.send(categoriesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const categoryDB = new Category(payload);
    await categoryDB.save();
    
    res.json(categoryDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const categoryDB = await Category.find({ _id });
    res.json(categoryDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    await Category.findByIdAndDelete({ _id });
    const categoriesDB = await Category.find();

    res.json(categoriesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const editCategory = async (req: Request, res: Response) => {
  const _id = req.body._id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'name',
  ]);

  try {
    const categoryDB = await Category.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(categoryDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};
