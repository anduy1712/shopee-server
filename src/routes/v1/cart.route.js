import express from 'express';
import { cartValidation } from '../../validations/cart.validation';
import { cartController } from '../../controllers/cart.controller';
import verifyToken from '../../middlewares/auth';

const router = express.Router();

router.route('/').post(cartValidation.create, cartController.create);
router.route('/user/:id').get(verifyToken, cartController.getByUser);
export const cartRoutes = router;
