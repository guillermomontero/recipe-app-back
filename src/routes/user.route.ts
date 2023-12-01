import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

router.get('/getAllUsers', verifyAdmin, UserController.getAllUsers);
router.post('/createUser', UserController.createUser);
router.get('/getUser/:id', verifyAuth, UserController.getUser);
router.get('/getUserData/:id', verifyAuth, UserController.getUserData);
router.put('/deleteUser', verifyAuth, UserController.deleteUser);
router.delete('/deleteUserAdmin/:id', verifyAdmin, UserController.deleteUserAdmin);
router.put('/editUser', verifyAuth, UserController.editUser);
router.put('/changeEmail', verifyAuth, UserController.changeEmail);
router.put('/changePassword', verifyAuth, UserController.changePassword);
router.put('/changePreferences', verifyAuth, UserController.changePreferences);
router.put('/changePlan', verifyAuth, UserController.changePlan);
router.put('/deleteImageProfile', verifyAuth, UserController.deleteImageProfile);
router.get('/getMyFavorites/:id', verifyAuth, UserController.getMyFavorites);
router.get('/getUsersForPanel', verifyAdmin, UserController.getUsersForPanel);
router.put('/unsuscribeUserAdmin', verifyAdmin, UserController.unsuscribeUserAdmin);
router.put('/editUserAdmin', verifyAdmin, UserController.editUserAdmin);

export default router;
