import { Request, Response } from "express";
import Recipe from '../models/recipe.model';
import _ from 'underscore';

export class RecipeController {
  static getAllRecipes = async (req: Request, res: Response) => {
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
  
  static getAllRecipesPagination = async (req: Request, res: Response) => {
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
  
  static getAllRecipesForSearch = async (req: Request, res: Response) => {
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
  
  static createRecipe = async (req: Request, res: Response) => {
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
  
  static getRecipe = async (req: Request, res: Response) => {
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
  
  static deleteRecipe = async (req: Request, res: Response) => {
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
  
  static deleteRecipeAdmin = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      await Recipe.findByIdAndDelete({ _id });
  
      res.json({ msg: 'Recipe successfully deleted'});
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static editRecipe = async (req: Request, res: Response) => {
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
  
  static getMyRecipes = async (req: Request, res: Response) => {
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
  
  static getLatestRecipes = async (req: Request, res: Response) => {
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 9;
  
    try {
      const totalRecipesDB = await Recipe.find({ draft: false }).countDocuments();
      const recipesDB = await Recipe.find({ draft: false }).populate({ path: 'author', select: 'nickname name lastname' }).sort({ createDate: -1 }).skip(skip).limit(limit);
      
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
  
  static getBestRecipes = async (req: Request, res: Response) => {
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
  
  static getWorstRecipes = async (req: Request, res: Response) => {
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
  
  static doLikeRecipe = async (req: Request, res: Response) => {
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
  
  static doUnlikeRecipe = async (req: Request, res: Response) => {
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
  
  static getRecipesForPanel = async (req: Request, res: Response) => {
    const dateUntil = new Date().toISOString().split('T')[0];
    const fromServerUntil = new Date(dateUntil).toISOString().split('T')[0];
  
    const getDateFrom = new Date().getTime() - ((24*60*60*1000) * 7);
    const dateFrom = new Date(getDateFrom).toISOString().split('T')[0];
    const fromServerFrom = new Date(dateFrom).toISOString().split('T')[0];
  
    const from = req.query.from || fromServerFrom;
    const until = req.query.until || fromServerUntil;
  
    try {
      const totalRecipesDB = await Recipe.find().countDocuments();
      const agg = [
        {
          '$match': {
            'createDate': { $gte: new Date(String(from)), $lte: new Date(String(until)) }
          },
        },
      ];
      const recipesDB = await Recipe.aggregate(agg).group({ _id: '$createDate', total: { $sum: 1 } }).sort({ _id: 1 });
      
      const recipes = {
        id: String(new Date().getTime()),
        title: 'recetas',
        page: 'admin-recipes',
        total: totalRecipesDB,
        showChart: true,
        order: 2,
        labelTooltip: 'recetasDadasDeAlta',
        range: [from, until],
        totalLastWeek: recipesDB.reduce((a, b) => a + b.total, 0),
        data: recipesDB
      };
  
      res.json(recipes);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
};

export default RecipeController;
