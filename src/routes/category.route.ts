import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import {
  getAllCategories,
  getCategory,
  createCategory,
  editCategoryAdmin,
  deleteCategoryAdmin,
  getCategoriesForPanel } from '../controllers/category.controller';

const router = Router();

router.get('/getAllCategories', verifyAuth, getAllCategories);
router.get('/getCategory/:id', verifyAuth, getCategory);
router.post('/createCategory', verifyAdmin, createCategory);
router.put('/editCategoryAdmin', verifyAdmin, editCategoryAdmin);
router.delete('/deleteCategoryAdmin/:id', verifyAdmin, deleteCategoryAdmin);
router.get('/getCategoriesForPanel', verifyAdmin, getCategoriesForPanel);

export default router;
