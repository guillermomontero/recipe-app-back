import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.middleware';
import { getAllRecipes, createRecipe, getRecipe, deleteRecipe, editRecipe } from '../controllers/recipe.controller';

const router = Router();

router.get('/getAllRecipes', verifyAuth, getAllRecipes);
router.post('/createRecipe', verifyAuth, createRecipe);
router.get('/getRecipe', verifyAuth, getRecipe);
router.delete('/recipes/:id', verifyAuth, deleteRecipe);
router.put('/recipes/:id', verifyAuth, editRecipe);

export default router;
