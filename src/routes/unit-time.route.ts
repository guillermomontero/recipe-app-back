import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import {
  getAllUnitTimes, 
  getUnitTime,
  createUnitTime,
  editUnitTimeAdmin,
  deleteUnitTimeAdmin,
  getUnitTimesForPanel } from '../controllers/unit-time.controller';

const router = Router();

router.get('/getAllUnitTimes', verifyAuth, getAllUnitTimes);
router.get('/getUnitTime/:id', verifyAuth, getUnitTime);
router.post('/createUnitTime', verifyAdmin, createUnitTime);
router.put('/editUnitTimeAdmin', verifyAdmin, editUnitTimeAdmin);
router.delete('/deleteUnitTimeAdmin/:id', verifyAdmin, deleteUnitTimeAdmin);
router.get('/getUnitTimesForPanel', verifyAdmin, getUnitTimesForPanel);

export default router;
