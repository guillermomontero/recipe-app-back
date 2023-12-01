import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import RecipeController from '../controllers/recipe.controller';

const router = Router();

router.get('/getAllRecipes', verifyAuth, RecipeController.getAllRecipes);
router.get('/getAllRecipesPagination', verifyAuth, RecipeController.getAllRecipesPagination);
router.get('/getAllRecipesForSearch', verifyAuth, RecipeController.getAllRecipesForSearch);
router.post('/createRecipe', verifyAuth, RecipeController.createRecipe);
router.get('/getRecipe/:id', verifyAuth, RecipeController.getRecipe);
router.delete('/deleteRecipe/:id', verifyAuth, RecipeController.deleteRecipe);
router.delete('/deleteRecipeAdmin/:id', verifyAdmin, RecipeController.deleteRecipeAdmin);
router.put('/editRecipe', verifyAuth, RecipeController.editRecipe);
router.get('/getMyRecipes/:id', verifyAuth, RecipeController.getMyRecipes);
router.get('/getLatestRecipes/', verifyAuth, RecipeController.getLatestRecipes);
router.get('/getBestRecipes/', verifyAuth, RecipeController.getBestRecipes);
router.get('/getWorstRecipes/', verifyAuth, RecipeController.getWorstRecipes);
router.put('/doLikeRecipe/', verifyAuth, RecipeController.doLikeRecipe);
router.put('/doUnlikeRecipe/', verifyAuth, RecipeController.doUnlikeRecipe);
router.get('/getRecipesForPanel/', verifyAdmin, RecipeController.getRecipesForPanel);

export default router;
