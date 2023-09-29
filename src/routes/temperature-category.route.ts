import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import {
  getAllTemperatureCategories,
  getTemperatureCategory,
  createTemperatureCategory,
  editTemperatureCategoryAdmin,
  deleteTemperatureCategoryAdmin,
  getTemperatureCategoriesForPanel } from '../controllers/temperature-category.controller';

const router = Router();

router.get('/getAllTemperatureCategories', verifyAuth, getAllTemperatureCategories);
router.get('/getTemperatureCategory/:id', verifyAuth, getTemperatureCategory);
router.post('/createTemperatureCategory', verifyAdmin, createTemperatureCategory);
router.put('/editTemperatureCategoryAdmin', verifyAdmin, editTemperatureCategoryAdmin);
router.delete('/deleteTemperatureCategoryAdmin/:id', verifyAdmin, deleteTemperatureCategoryAdmin);
router.get('/getTemperatureCategoriesForPanel', verifyAdmin, getTemperatureCategoriesForPanel);

export default router;
