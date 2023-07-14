import { Router } from 'express';
import Category from '../models/category';
import _ from 'underscore';

const router = Router();

router.get('/categories', async (req, res) => {
  try {
    const categoriesDB = await Category.find();
    
    res.send(categoriesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
});

router.post('/categories', async (req, res) => {
  const payload = req.body;

  try {
    const categoryDB = new Category(payload);
    await categoryDB.save();
    
    res.json(categoryDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
});

router.get('/categories/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const categoryDB = await Category.find({ _id });
    res.json(categoryDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
});

router.delete('/categories/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    await Category.findByIdAndDelete({ _id });
    const categoriesDB = await Category.find();

    res.json(categoriesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
});

router.put('/categories/:id', async (req, res) => {
  const _id = req.params.id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'name',
  ]);

  try {
    const categoryBD = await Category.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(categoryBD);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
});

export default router;
