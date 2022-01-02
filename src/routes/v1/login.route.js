import express from 'express';

import { loginController } from '../../controllers/login.controller';
import verifyToken from '../../middlewares/auth';
import { authValidate } from '../../validations/auth.validation';

const router = express.Router();

router.route('/')
    .post(authValidate.create, loginController.create)
    .get(verifyToken,loginController.get)
export const loginRoutes = router;
