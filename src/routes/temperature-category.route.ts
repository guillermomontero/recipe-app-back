import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createTemperatureCategory, deleteTemperatureCategoryAdmin, editTemperatureCategoryAdmin, getAllTemperatureCategories, getTemperatureCategory, getTemperatureCategoriesForPanel } from '../controllers/temperature-category.controller';

const router = Router();

router.get('/getAllTemperatureCategories', verifyAuth, getAllTemperatureCategories);
router.post('/createTemperatureCategory', verifyAdmin, createTemperatureCategory);
router.get('/getTemperatureCategory/:id', verifyAuth, getTemperatureCategory);
router.delete('/deleteTemperatureCategoryAdmin/:id', verifyAdmin, deleteTemperatureCategoryAdmin);
router.put('/editTemperatureCategoryAdmin', verifyAdmin, editTemperatureCategoryAdmin);
router.get('/getTemperatureCategoriesForPanel', verifyAdmin, getTemperatureCategoriesForPanel);

export default router;
