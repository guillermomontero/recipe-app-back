import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.middleware';
import {
  getAllRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  editRecipe,
  getMyRecipes,
  getLatestRecipes,
  getBestRecipes,
  getWorstRecipes, 
  doLikeRecipe,
  doUnlikeRecipe } from '../controllers/recipe.controller';

const router = Router();

router.get('/getAllRecipes', verifyAuth, getAllRecipes);
router.post('/createRecipe', verifyAuth, createRecipe);
router.get('/getRecipe/:id', verifyAuth, getRecipe);
router.delete('/deleteRecipe/:id', verifyAuth, deleteRecipe);
router.put('/editRecipe', verifyAuth, editRecipe);
router.get('/getMyRecipes/:id', verifyAuth, getMyRecipes);
router.get('/getLatestRecipes/', verifyAuth, getLatestRecipes);
router.get('/getBestRecipes/', verifyAuth, getBestRecipes);
router.get('/getWorstRecipes/', verifyAuth, getWorstRecipes);
router.put('/doLikeRecipe/', verifyAuth, doLikeRecipe);
router.put('/doUnlikeRecipe/', verifyAuth, doUnlikeRecipe);

export default router;