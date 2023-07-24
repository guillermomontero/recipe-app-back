import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createWeightType, deleteWeightType, editWeightType, getAllWeightTypes } from '../controllers/weight-type.controller';

const router = Router();

router.get('/getAllWeightTypes', verifyAuth, getAllWeightTypes);
router.post('/createWeightType', verifyAdmin, createWeightType);
router.delete('/deleteWeightType/:id', verifyAdmin, deleteWeightType);
router.put('/editWeightType', verifyAdmin, editWeightType);

export default router;
