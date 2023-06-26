import { Router } from 'express';
import Recipe from '../models/recipe';

const router = Router();

router.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

router.post('/recipes', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  
  res.send(recipe);
});

router.get('/recipes/:id', (req, res) => {
  res.send('Obtener una receta');
});

router.delete('/recipes/:id', (req, res) => {
  res.send('Eliminar una receta');
});

router.put('/recipes/:id', (req, res) => {
  res.send('Editar una receta');
});

export default router;
