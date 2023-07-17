import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategory } from '../controllers/category.controller';

const router = Router();

router.get('/getAllcategories', verifyAuth, getAllCategories);
router.post('/createCategory', verifyAdmin, createCategory);
router.get('/getCategory/:id', verifyAdmin, getCategory);
router.delete('/deleteCategory/:id', verifyAdmin, deleteCategory);
router.put('/editCategory/:id', verifyAdmin, editCategory);

export default router;
