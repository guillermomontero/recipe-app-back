import { Request, Response } from "express";
import Recipe from '../models/recipe.model';
import _ from 'underscore';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipesDB = await Recipe.find();
    
    res.send(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const recipeDB = new Recipe(payload);
    await recipeDB.save();
    
    res.json(recipeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const recipeDB = await Recipe.find({ _id });
    res.json(recipeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    await Recipe.findByIdAndDelete({ _id });
    const recipesDB = await Recipe.find();

    res.json(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const editRecipe = async (req: Request, res: Response) => {
  const _id = req.params.id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'title',
    'description',
    'ingredients',
    'steps',
    'cookingTime',
    'temperatureCategory',
    'categories',
    'origin',
    'photo'
  ]);

  try {
    const recipeDB = await Recipe.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(recipeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};
