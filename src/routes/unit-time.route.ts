import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createUnitTime, getUnitTime, deleteUnitTimeAdmin, editUnitTimeAdmin, getAllUnitTimes, getUnitTimesForPanel } from '../controllers/unit-time.controller';

const router = Router();

router.get('/getAllUnitTimes', verifyAuth, getAllUnitTimes);
router.get('/getUnitTime/:id', verifyAuth, getUnitTime);
router.post('/createUnitTime', verifyAdmin, createUnitTime);
router.delete('/deleteUnitTimeAdmin/:id', verifyAdmin, deleteUnitTimeAdmin);
router.put('/editUnitTimeAdmin', verifyAdmin, editUnitTimeAdmin);
router.get('/getUnitTimesForPanel', verifyAdmin, getUnitTimesForPanel);

export default router;
