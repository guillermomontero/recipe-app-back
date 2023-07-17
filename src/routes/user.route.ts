import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { getAllUSers, createUser, getUser, deleteUser, editUser } from '../controllers/user.controller';

const router = Router();

router.get('/getAllUsers', verifyAdmin, getAllUSers);
router.post('/createUser', createUser);
router.get('/getUser/:id', verifyAuth, getUser);
router.delete('/deleteUser/:id', verifyAdmin, deleteUser);
router.put('/editUser/:id', verifyAuth, editUser);

export default router;
