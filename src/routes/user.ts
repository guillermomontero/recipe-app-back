import { Router } from 'express';

const router = Router();

router.get('/recipes', (req, res) => {
  res.send('Hello world');
});

router.post('/recipes', (req, res) => {
  res.send('Hello world');
});

router.get('/recipes/:id', (req, res) => {
  res.send('Hello world');
});

router.delete('/recipes/id', (req, res) => {
  res.send('Hello world');
});

router.put('/recipes/:id', (req, res) => {
  res.send('Hello world');
});

export default router;
