import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/login', AuthController.login);
router.get('/verifyAccount/:token', AuthController.verifyAccount);

export default router;
