import express from 'express';

import { loginController } from '../../controllers/login.controller';
import { authValidate } from '../../validations/auth.validation';

const router = express.Router();

router.route('/').post(authValidate.create, loginController.create);

export const loginRoutes = router;
