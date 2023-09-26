import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createCategory, deleteCategoryAdmin, apiEditCategoryAdmin, getAllCategories, getCategory, getCategoriesForPanel } from '../controllers/category.controller';

const router = Router();

router.get('/getAllCategories', verifyAuth, getAllCategories);
router.post('/createCategory', verifyAdmin, createCategory);
router.get('/getCategory/:id', verifyAuth, getCategory);
router.delete('/deleteCategoryAdmin/:id', verifyAdmin, deleteCategoryAdmin);
router.put('/apiEditCategoryAdmin', verifyAdmin, apiEditCategoryAdmin);
router.get('/getCategoriesForPanel', verifyAdmin, getCategoriesForPanel);

export default router;
