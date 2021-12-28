import express from 'express';
import { authController } from '../../controllers/auth.controller';
import { authValidate } from '../../validations/auth.validation';

const router = express.Router();

router.route('/').post(authValidate.create, authController.create);

export const authRoutes = router;
