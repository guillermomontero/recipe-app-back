import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategory } from '../controllers/category.controller';

const router = Router();

router.get('/getAllCategories', verifyAuth, getAllCategories);
router.post('/createCategory', verifyAdmin, createCategory);
router.get('/getCategory/:id', verifyAuth, getCategory);
router.delete('/deleteCategory/:id', verifyAdmin, deleteCategory);
router.put('/editCategory', verifyAdmin, editCategory);

export default router;
