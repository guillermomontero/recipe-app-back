import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { createUnitType, deleteUnitType, editUnitType, getAllUnitTypes } from '../controllers/unit-type.controller';

const router = Router();

router.get('/getAllUnitTypes', verifyAuth, getAllUnitTypes);
router.post('/createUnitType', verifyAdmin, createUnitType);
router.delete('/deleteUnitType/:id', verifyAdmin, deleteUnitType);
router.put('/editUnitType', verifyAdmin, editUnitType);

export default router;
