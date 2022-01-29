import express from 'express';
import verifyToken from '../../middlewares/auth';
import { productValidion } from '../../validations/product.validation';
import { productController } from '../../controllers/product.controller';
const router = express.Router();

router
  .route('/')
  .post(productValidion.create, verifyToken, productController.create)
  .get(productController.get);

router.route('/:id').get(productController.getProduct);
export const productRoutes = router;
