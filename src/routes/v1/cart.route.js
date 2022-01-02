import express from 'express';
import { cartController } from '../../controllers/cart.controller';

const router = express.Router();

router
  .route('/')
  .get(cartController.get);

export const cartRoutes = router;
