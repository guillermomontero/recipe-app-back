import { Router } from 'express';
// import { verifyAuth } from '../middlewares/auth.middleware';
import multer from 'multer';
import path from "node:path";
import storageAvatar from '../multer/avatar';
import storageRecipe from '../multer/recipe';
import { uploadAvatar, uploadRecipe } from '../controllers/files.controller';

const router = Router();

const fileFilterFn = (file: any, cb: any) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname));

  if (mimetype && extname) return cb(null, true);
  cb(new Error('Error: image not valid'));
};

const uploadMiddAvatar = multer({ storage: storageAvatar, limits: { fileSize: 5000000 }, fileFilter: (req, file, cb) => fileFilterFn(file, cb) }).single('image');
const uploadMiddRecipe = multer({ storage: storageRecipe, limits: { fileSize: 5000000 }, fileFilter: (req, file, cb) => fileFilterFn(file, cb) }).single('image');

router.post('/uploadAvatar/:id', uploadMiddAvatar, uploadAvatar);
router.post('/uploadRecipe/:id', uploadMiddRecipe, uploadRecipe);

export default router;