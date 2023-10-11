import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import {
  getAllRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
  deleteRecipeAdmin,
  getAllRecipesPagination,
  getAllRecipesForSearch,
  getMyRecipes,
  getLatestRecipes,
  getBestRecipes,
  getWorstRecipes, 
  doLikeRecipe,
  doUnlikeRecipe,
  getRecipesForPanel } from '../controllers/recipe.controller';

const router = Router();

router.get('/getAllRecipes', verifyAuth, getAllRecipes);
router.get('/getRecipe/:id', verifyAuth, getRecipe);
router.post('/createRecipe', verifyAuth, createRecipe);
router.put('/editRecipe', verifyAuth, editRecipe);
router.delete('/deleteRecipe/:id', verifyAuth, deleteRecipe);
router.delete('/deleteRecipeAdmin/:id', verifyAdmin, deleteRecipeAdmin);
router.get('/getAllRecipesPagination', verifyAuth, getAllRecipesPagination);
router.get('/getAllRecipesForSearch', verifyAuth, getAllRecipesForSearch);
router.get('/getMyRecipes/:id', verifyAuth, getMyRecipes);
router.get('/getLatestRecipes/', verifyAuth, getLatestRecipes);
router.get('/getBestRecipes/', verifyAuth, getBestRecipes);
router.get('/getWorstRecipes/', verifyAuth, getWorstRecipes);
router.put('/doLikeRecipe/', verifyAuth, doLikeRecipe);
router.put('/doUnlikeRecipe/', verifyAuth, doUnlikeRecipe);
router.get('/getRecipesForPanel/', verifyAdmin, getRecipesForPanel);

export default router;
