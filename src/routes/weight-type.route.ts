import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import {
  getAllWeightTypes,
  getWeightType,
  createWeightType,
  editWeightTypeAdmin,
  deleteWeightTypeAdmin,
  getWeightTypesForPanel } from '../controllers/weight-type.controller';

const router = Router();

router.get('/getAllWeightTypes', verifyAuth, getAllWeightTypes);
router.get('/getWeightType/:id', verifyAuth, getWeightType);
router.post('/createWeightType', verifyAdmin, createWeightType);
router.put('/editWeightTypeAdmin', verifyAdmin, editWeightTypeAdmin);
router.delete('/deleteWeightTypeAdmin/:id', verifyAdmin, deleteWeightTypeAdmin);
router.get('/getWeightTypesForPanel', verifyAdmin, getWeightTypesForPanel);

export default router;
