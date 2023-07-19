import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createTemperatureCategory, deleteTemperatureCategory, editTemperatureCategory, getAllTemperatureCategories, getTemperatureCategory } from '../controllers/temperature-category.controller';

const router = Router();

router.get('/getAllTemperatureCategories', verifyAuth, getAllTemperatureCategories);
router.post('/createTemperatureCategory', verifyAdmin, createTemperatureCategory);
router.get('/getTemperatureCategory/:id', verifyAuth, getTemperatureCategory);
router.delete('/deleteTemperatureCategory/:id', verifyAdmin, deleteTemperatureCategory);
router.put('/editTemperatureCategory', verifyAdmin, editTemperatureCategory);

export default router;