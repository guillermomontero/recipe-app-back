import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { getAllUsers, createUser, getUser, deleteUser, editUser } from '../controllers/user.controller';

const router = Router();

router.get('/getAllUsers', verifyAdmin, getAllUsers);
router.post('/createUser', createUser);
router.get('/getUser/:id', verifyAuth, getUser);
router.delete('/deleteUser/:id', verifyAdmin, deleteUser);
router.put('/editUser', verifyAuth, editUser);

export default router;
