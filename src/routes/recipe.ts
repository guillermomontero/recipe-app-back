import { Router } from 'express';
import Recipe from '../models/recipe';
import _ from 'underscore';

const router = Router();

router.get('/recipes', async (req, res) => {
  try {
    const recipesDB = await Recipe.find();
    
    res.send(recipesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
});

router.post('/recipes', async (req, res) => {
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
});

router.get('/recipes/:id', async (req, res) => {
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
});

router.delete('/recipes/:id', async (req, res) => {
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
});

router.put('/recipes/:id', async (req, res) => {
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
    const recipeBD = await Recipe.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(recipeBD);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
});

export default router;
