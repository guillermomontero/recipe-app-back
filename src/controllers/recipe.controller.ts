import { Request, Response } from "express";
import Recipe from '../models/recipe.model';
import _ from 'underscore';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipesDB = await Recipe.find({ draft: false });
    
    res.send(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getAllRecipesPagination = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 0;

  try {
    const totalRecipesDB = await Recipe.find({ draft: false }).countDocuments();
    const recipesDB = await Recipe.find({ draft: false }).skip(skip).limit(limit);
    
    const recipes = {
      totalRecipes: totalRecipesDB,
      recipes: recipesDB
    };

    res.json(recipes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getAllRecipesForSearch = async (req: Request, res: Response) => {
  try {
    const totalRecipesDB = await Recipe.find({ draft: false }).countDocuments();
    const recipesDB = await Recipe.find({ draft: false }, { title: 1, categories: 1, temperatureCategory: 1, origin: 1, cookingTime: 1, unitTime: 1  });
    
    const recipes = {
      totalRecipes: totalRecipesDB,
      recipes: recipesDB
    };

    res.json(recipes);
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
    res.json(recipeDB[0]);
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
    'unitTime',
    'temperatureCategory',
    'categories',
    'origin',
    'draft',
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
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 0;

  try {
    const totalRecipesDB = await Recipe.find({ author: _id }).countDocuments();
    const recipesDB = await Recipe.find({ author: _id }).sort({ createDate: -1 }).skip(skip).limit(limit);
    
    const recipes = {
      totalRecipes: totalRecipesDB,
      recipes: recipesDB
    };

    res.json(recipes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getLatestRecipes = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 9;

  try {
    const totalRecipesDB = await Recipe.find({ draft: false }).countDocuments();
    const recipesDB = await Recipe.find({ draft: false }).populate({ path: 'author', select: 'nickname name lastName' }).sort({ createDate: -1 }).skip(skip).limit(limit);
    
    const recipes = {
      totalRecipes: totalRecipesDB,
      recipes: recipesDB
    };

    res.json(recipes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getBestRecipes = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 9;

  try {
    const totalRecipesDB = await Recipe.find({ draft: false }).countDocuments();
    const recipesDB = await Recipe.find({ draft: false }).sort({ likes: -1 }).skip(skip).limit(limit);
    
    const recipes = {
      totalRecipes: totalRecipesDB,
      recipes: recipesDB
    };

    res.json(recipes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getWorstRecipes = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 9;
  
  try {
    const totalRecipesDB = await Recipe.find({ draft: false }).countDocuments();
    const recipesDB = await Recipe.find({ draft: false }).sort({ likes: 1 }).skip(skip).limit(limit);
    
    const recipes = {
      totalRecipes: totalRecipesDB,
      recipes: recipesDB
    };

    res.json(recipes);
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
