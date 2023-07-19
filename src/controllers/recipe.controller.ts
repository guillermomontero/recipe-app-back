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
  const _id = req.body._id;
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

export const getMyRecipes = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const recipesDB = await Recipe.find({ author: _id });
    res.json(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getLatestRecipes = async (req: Request, res: Response) => {
  try {
    const recipesDB = await Recipe.find({ active: true }).limit(8);
    res.json(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getBestRecipes = async (req: Request, res: Response) => {
  try {
    const recipesDB = await Recipe.find({ active: true }).sort({ likes: -1 }).limit(8);
    res.json(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getWorstRecipes = async (req: Request, res: Response) => {
  try {
    const recipesDB = await Recipe.find({ active: true }).sort({ likes: 1 }).limit(8);
    res.json(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const doLikeRecipe = async (req: Request, res: Response) => {
  const _id = req.body._id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'likes',
  ]);

  try {
    const recipeDB = await Recipe.findByIdAndUpdate(_id, { $inc : { 'likes' : body.likes } }, { new: true, runValidators: true, context: 'query' });

    res.json(recipeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const doUnlikeRecipe = async (req: Request, res: Response) => {
  const _id = req.body._id;

  try {
    const recipeDB = await Recipe.findByIdAndUpdate(_id, { $inc : { 'likes' : -1 } }, { new: true, runValidators: true, context: 'query' });

    res.json(recipeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};
