import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import UnitTimeController from '../controllers/unit-time.controller';

const router = Router();

router.get('/getAllUnitTimes', verifyAuth, UnitTimeController.getAllUnitTimes);
router.get('/getUnitTime/:id', verifyAuth, UnitTimeController.getUnitTime);
router.post('/createUnitTime', verifyAdmin, UnitTimeController.createUnitTime);
router.delete('/deleteUnitTimeAdmin/:id', verifyAdmin, UnitTimeController.deleteUnitTimeAdmin);
router.put('/editUnitTimeAdmin', verifyAdmin, UnitTimeController.editUnitTimeAdmin);
router.get('/getUnitTimesForPanel', verifyAdmin, UnitTimeController.getUnitTimesForPanel);

export default router;
