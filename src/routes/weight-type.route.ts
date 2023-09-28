import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createWeightType, getWeightType, deleteWeightTypeAdmin, editWeightTypeAdmin, getAllWeightTypes, getWeightTypesForPanel } from '../controllers/weight-type.controller';

const router = Router();

router.get('/getAllWeightTypes', verifyAuth, getAllWeightTypes);
router.get('/getWeightType/:id', verifyAuth, getWeightType);
router.post('/createWeightType', verifyAdmin, createWeightType);
router.delete('/deleteWeightTypeAdmin/:id', verifyAdmin, deleteWeightTypeAdmin);
router.put('/editWeightTypeAdmin', verifyAdmin, editWeightTypeAdmin);
router.get('/getWeightTypesForPanel', verifyAdmin, getWeightTypesForPanel);

export default router;
