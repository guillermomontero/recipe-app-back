import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createUnitTime, deleteUnitTime, editUnitTime, getAllUnitTimes, getUnitTimesForPanel } from '../controllers/unit-time.controller';

const router = Router();

router.get('/getAllUnitTimes', verifyAuth, getAllUnitTimes);
router.post('/createUnitTime', verifyAdmin, createUnitTime);
router.delete('/deleteUnitTime/:id', verifyAdmin, deleteUnitTime);
router.put('/editUnitTime', verifyAdmin, editUnitTime);
router.get('/getUnitTimesForPanel', verifyAdmin, getUnitTimesForPanel);

export default router;
