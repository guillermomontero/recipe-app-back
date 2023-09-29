import { Router } from 'express';
import { verifyAuth, verifyAdmin } from '../middlewares/auth.middleware';
import {
  getAllUsers,
  getUser,
  getUserData,
  createUser,
  editUser,
  editUserAdmin,
  deleteUser,
  deleteUserAdmin,
  changeEmail,
  changePassword,
  changePreferences,
  changePlan,
  deleteImageProfile,
  getMyFavorites,
  getUsersForPanel,
  unsuscribeUserAdmin } from '../controllers/user.controller';

const router = Router();

router.get('/getAllUsers', verifyAdmin, getAllUsers);
router.get('/getUser/:id', verifyAuth, getUser);
router.get('/getUserData/:id', verifyAuth, getUserData);
router.post('/createUser', createUser);
router.put('/editUser', verifyAuth, editUser);
router.put('/editUserAdmin', verifyAdmin, editUserAdmin);
router.put('/deleteUser', verifyAuth, deleteUser);
router.delete('/deleteUserAdmin/:id', verifyAdmin, deleteUserAdmin);
router.put('/changeEmail', verifyAuth, changeEmail);
router.put('/changePassword', verifyAuth, changePassword);
router.put('/changePreferences', verifyAuth, changePreferences);
router.put('/changePlan', verifyAuth, changePlan);
router.put('/deleteImageProfile', verifyAuth, deleteImageProfile);
router.get('/getMyFavorites/:id', verifyAuth, getMyFavorites);
router.get('/getUsersForPanel', verifyAdmin, getUsersForPanel);
router.put('/unsuscribeUserAdmin', verifyAdmin, unsuscribeUserAdmin);

export default router;
