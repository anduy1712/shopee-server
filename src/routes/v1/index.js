import express from 'express';
import { authRoutes } from './auth.route';
import { loginRoutes } from './login.route';
import { productRoutes } from './product.route';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/register', authRoutes);
router.use('/login', loginRoutes);
export const apiV1 = router;
