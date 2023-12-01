import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import CategoryController from '../controllers/category.controller';

const router = Router();

router.get('/getAllCategories', verifyAuth, CategoryController.getAllCategories);
router.post('/createCategory', verifyAdmin, CategoryController.createCategory);
router.get('/getCategory/:id', verifyAuth, CategoryController.getCategory);
router.delete('/deleteCategoryAdmin/:id', verifyAdmin, CategoryController.deleteCategoryAdmin);
router.put('/editCategoryAdmin', verifyAdmin, CategoryController.editCategoryAdmin);
router.get('/getCategoriesForPanel', verifyAdmin, CategoryController.getCategoriesForPanel);

export default router;
