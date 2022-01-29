import express from 'express';
import { authRoutes } from './auth.route';
import { loginRoutes } from './login.route';
import { productRoutes } from './product.route';
import { cartRoutes } from './cart.route';

const router = express.Router();

router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/register', authRoutes);
router.use('/login', loginRoutes);
export const apiV1 = router;
