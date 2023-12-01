import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import WeightTypeController from '../controllers/weight-type.controller';

const router = Router();

router.get('/getAllWeightTypes', verifyAuth, WeightTypeController.getAllWeightTypes);
router.get('/getWeightType/:id', verifyAuth, WeightTypeController.getWeightType);
router.post('/createWeightType', verifyAdmin, WeightTypeController.createWeightType);
router.delete('/deleteWeightTypeAdmin/:id', verifyAdmin, WeightTypeController.deleteWeightTypeAdmin);
router.put('/editWeightTypeAdmin', verifyAdmin, WeightTypeController.editWeightTypeAdmin);
router.get('/getWeightTypesForPanel', verifyAdmin, WeightTypeController.getWeightTypesForPanel);

export default router;
