import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import { getAllUsers, createUser, getUser, deleteUser, editUser, changeEmail, changePassword, changePreferences, changePlan } from '../controllers/user.controller';

const router = Router();

router.get('/getAllUsers', verifyAdmin, getAllUsers);
router.post('/createUser', createUser);
router.get('/getUser/:id', verifyAuth, getUser);
router.put('/deleteUser', verifyAuth, deleteUser);
router.delete('/deleteUserAdmin/:id', verifyAdmin, deleteUser);
router.put('/editUser', verifyAuth, editUser);
router.put('/changeEmail', verifyAuth, changeEmail);
router.put('/changePassword', verifyAuth, changePassword);
router.put('/changePreferences', verifyAuth, changePreferences);
router.put('/changePlan', verifyAuth, changePlan);

export default router;
