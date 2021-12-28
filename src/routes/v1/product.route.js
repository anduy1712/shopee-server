import express from 'express';
import { productController } from '../../controllers/product.controller';
import verifyToken from '../../middlewares/auth';
import { productValidion } from '../../validations/product.validation';

const router = express.Router();

router
  .route('/')
  .post(productValidion.create, verifyToken, productController.create)
  .get(productController.get);
export const productRoutes = router;
