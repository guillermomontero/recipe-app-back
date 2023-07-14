import { Router } from 'express';
import User from '../models/user';
import _ from 'underscore';

const router = Router();

router.get('/users', async (req, res) => {
  try {
    const usersDB = await User.find();
    
    res.send(usersDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
});

router.post('/users', async (req, res) => {
  const payload = req.body;

  try {
    const userDB = new User(payload);
    await userDB.save();
    
    res.json(userDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const userDB = await User.find({ _id });
    res.json(userDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
});

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    await User.findByIdAndDelete({ _id });
    const usersDB = await User.find();

    res.json(usersDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
});

router.put('/users/:id', async (req, res) => {
  const _id = req.params.id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'name',
    'lastName',
    'email',
    'telephone',
    'location',
    'imageProfile',
    'cardNumber',
    'cardExpires',
    'password',
    'allowEmail',
    'notifications'
  ]);

  try {
    const userDB = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(userDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
});

export default router;
