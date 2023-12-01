import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import TemperatureCategoryController from '../controllers/temperature-category.controller';

const router = Router();

router.get('/getAllTemperatureCategories', verifyAuth, TemperatureCategoryController.getAllTemperatureCategories);
router.post('/createTemperatureCategory', verifyAdmin, TemperatureCategoryController.createTemperatureCategory);
router.get('/getTemperatureCategory/:id', verifyAuth, TemperatureCategoryController.getTemperatureCategory);
router.delete('/deleteTemperatureCategoryAdmin/:id', verifyAdmin, TemperatureCategoryController.deleteTemperatureCategoryAdmin);
router.put('/editTemperatureCategoryAdmin', verifyAdmin, TemperatureCategoryController.editTemperatureCategoryAdmin);
router.get('/getTemperatureCategoriesForPanel', verifyAdmin, TemperatureCategoryController.getTemperatureCategoriesForPanel);

export default router;
